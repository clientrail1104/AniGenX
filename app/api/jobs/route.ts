import { NextResponse } from "next/server";
import { CreateJobCommand } from "@aws-sdk/client-mediaconvert";
import { mediaConvert, requireCloudEnv } from "@/lib/aws";
import type { ExportConfig } from "@/types/editor";

function videoCodecSettings(config: ExportConfig) {
  if (config.codec === "h265") {
    return {
      Codec: "H_265",
      H265Settings: {
        RateControlMode: "VBR",
        Bitrate: config.bitrateMbps * 1_000_000,
        FramerateControl: "SPECIFIED",
        FramerateNumerator: config.framerate,
        FramerateDenominator: 1,
        QualityTuningLevel: "SINGLE_PASS_HQ"
      }
    };
  }

  if (config.codec === "prores") {
    return {
      Codec: "PRORES",
      ProresSettings: {
        CodecProfile: "APPLE_PRORES_422_HQ",
        FramerateControl: "SPECIFIED",
        FramerateNumerator: config.framerate,
        FramerateDenominator: 1
      }
    };
  }

  if (config.codec === "vp9") {
    return {
      Codec: "VP9",
      Vp9Settings: {
        RateControlMode: "VBR",
        Bitrate: config.bitrateMbps * 1_000_000,
        FramerateControl: "SPECIFIED",
        FramerateNumerator: config.framerate,
        FramerateDenominator: 1
      }
    };
  }

  return {
    Codec: "H_264",
    H264Settings: {
      RateControlMode: "VBR",
      Bitrate: config.bitrateMbps * 1_000_000,
      FramerateControl: "SPECIFIED",
      FramerateNumerator: config.framerate,
      FramerateDenominator: 1,
      QualityTuningLevel: "SINGLE_PASS_HQ"
    }
  };
}

function containerSettings(config: ExportConfig) {
  if (config.container === "mov") return { Container: "MOV" };
  if (config.container === "webm") return { Container: "WEBM" };
  return {
    Container: "MP4",
    Mp4Settings: {
      CslgAtom: "INCLUDE",
      FreeSpaceBox: "EXCLUDE",
      MoovPlacement: "PROGRESSIVE_DOWNLOAD"
    }
  };
}

export async function POST(request: Request) {
  try {
    const { inputBucket, outputBucket, roleArn } = requireCloudEnv();
    const { inputKey, config, preset } = (await request.json()) as {
      inputKey: string;
      config: ExportConfig;
      preset: string;
    };

    if (!inputKey?.startsWith("uploads/")) {
      return new NextResponse("Invalid input key.", { status: 400 });
    }

    const job = await mediaConvert.send(
      new CreateJobCommand({
        Role: roleArn,
        UserMetadata: {
          redlinePreset: preset,
          outputFormat: `${config.container}/${config.codec}`
        },
        Settings: {
          Inputs: [
            {
              FileInput: `s3://${inputBucket}/${inputKey}`,
              AudioSelectors: {
                "Audio Selector 1": { DefaultSelection: "DEFAULT" }
              },
              VideoSelector: {}
            }
          ],
          OutputGroups: [
            {
              Name: "Redline AI Master",
              OutputGroupSettings: {
                Type: "FILE_GROUP_SETTINGS",
                FileGroupSettings: {
                  Destination: `s3://${outputBucket}/renders/`
                }
              },
              Outputs: [
                {
                  NameModifier: `-redline-${config.width}x${config.height}`,
                  ContainerSettings: containerSettings(config) as any,
                  VideoDescription: {
                    Width: config.width,
                    Height: config.height,
                    CodecSettings: videoCodecSettings(config) as any
                  },
                  AudioDescriptions: [
                    {
                      CodecSettings:
                        config.container === "webm"
                          ? ({
                              Codec: "OPUS",
                              OpusSettings: {
                                Bitrate: 96000,
                                Channels: 2,
                                SampleRate: 48000
                              }
                            } as any)
                          : ({
                              Codec: "AAC",
                              AacSettings: {
                                Bitrate: 192000,
                                CodingMode: "CODING_MODE_2_0",
                                SampleRate: 48000
                              }
                            } as any)
                    }
                  ]
                }
              ]
            }
          ]
        } as any
      })
    );

    return NextResponse.json({
      jobId: job.Job?.Id,
      status: job.Job?.Status ?? "SUBMITTED"
    });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unable to submit cloud job.",
      { status: 500 }
    );
  }
}
