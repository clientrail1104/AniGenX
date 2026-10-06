import { NextResponse } from "next/server";
import { GetJobCommand } from "@aws-sdk/client-mediaconvert";
import { mediaConvert, requireCloudEnv } from "@/lib/aws";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    requireCloudEnv();
    const { id } = await context.params;

    if (!/^[a-zA-Z0-9-]+$/.test(id)) {
      return new NextResponse("Invalid job id.", { status: 400 });
    }

    const result = await mediaConvert.send(new GetJobCommand({ Id: id }));
    const job = result.Job;

    return NextResponse.json({
      jobId: job?.Id,
      status: job?.Status ?? "UNKNOWN",
      percentComplete: job?.JobPercentComplete ?? 0
    });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unable to fetch cloud job.",
      { status: 500 }
    );
  }
}
