import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireCloudEnv, s3 } from "@/lib/aws";

const SAFE_EXTENSIONS = new Set([
  "mp4", "mov", "avi", "mkv", "webm", "m4v", "mxf", "r3d", "braw",
  "ari", "arx", "cin", "dng", "crm", "m2ts", "mts", "mpg", "mpeg"
]);

export async function POST(request: Request) {
  try {
    const { inputBucket } = requireCloudEnv();
    const body = await request.json();
    const fileName = String(body.fileName || "");
    const contentType = String(body.contentType || "application/octet-stream");
    const ext = fileName.split(".").pop()?.toLowerCase() || "";

    if (!fileName || !SAFE_EXTENSIONS.has(ext)) {
      return new NextResponse("Unsupported source file type.", { status: 400 });
    }

    const safeBase = fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .slice(0, 90);

    const key = `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeBase}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: inputBucket,
      Key: key,
      ContentType: contentType
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 900 });

    return NextResponse.json({ key, url });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unable to create upload URL.",
      { status: 500 }
    );
  }
}
