import { NextRequest, NextResponse } from "next/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { filename } = await request.json();
    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    const client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const key = `certificates/${uuidv4()}-${filename}`;

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Conditions: [["content-length-range", 0, 10485760]], // 10 MB
      Expires: 600, // 10 minutes
    });

    return NextResponse.json({ url, fields, key });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create presigned URL", details: err instanceof Error ? err.message : "Unknown" },
      { status: 500 }
    );
  }
}
