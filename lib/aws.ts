import { MediaConvertClient } from "@aws-sdk/client-mediaconvert";
import { S3Client } from "@aws-sdk/client-s3";

export const awsRegion = process.env.AWS_REGION || "ap-southeast-1";

export const s3 = new S3Client({
  region: awsRegion
});

export const mediaConvert = new MediaConvertClient({
  region: awsRegion,
  endpoint: process.env.AWS_MEDIACONVERT_ENDPOINT || undefined
});

export function requireCloudEnv() {
  const required = [
    "AWS_S3_INPUT_BUCKET",
    "AWS_S3_OUTPUT_BUCKET",
    "AWS_MEDIACONVERT_ROLE_ARN"
  ] as const;

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing cloud configuration: ${missing.join(", ")}`);
  }

  return {
    inputBucket: process.env.AWS_S3_INPUT_BUCKET!,
    outputBucket: process.env.AWS_S3_OUTPUT_BUCKET!,
    roleArn: process.env.AWS_MEDIACONVERT_ROLE_ARN!
  };
}
