import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";
import { NextResponse } from "next/server";

// GET request handler for listing images
export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
    });

    const data = await s3Client.send(command);

    if (!data.Contents) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    const images = data.Contents.filter(
      (item) => item.Key && item.Key.match(/\.(jpg|jpeg|png|gif)$/i)
    ).map((item) => item.Key as string);

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}
