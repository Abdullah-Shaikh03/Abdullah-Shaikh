import { type NextRequest, NextResponse } from "next/server";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Ensure all required environment variables are present
    const requiredEnvVars = {
      AWS_REGION: process.env.AWS_REGION,
      AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      return NextResponse.json(
        { error: `Missing environment variables: ${missingVars.join(", ")}` },
        { status: 500 }
      );
    }

    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Filename and content type are required" },
        { status: 400 }
      );
    }

    // Create the S3 client
    const client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Generate a unique key for the file
    const key = `certificates/${uuidv4()}-${filename}`;

    // Create the presigned post
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Fields: {
        "Content-Type": contentType,
      },
      Conditions: [
        ["starts-with", "$Content-Type", contentType],
        ["content-length-range", 0, 10485760], // 10 MB max
      ],
      Expires: 600, // Expires in 10 minutes
    });

    return NextResponse.json({ url, fields, key });
  } catch (error) {
    console.error("S3 upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to create upload URL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
