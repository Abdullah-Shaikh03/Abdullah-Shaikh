import { type NextRequest, NextResponse } from "next/server"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { S3Client } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    const requiredEnvVars = {
      AWS_REGION: process.env.AWS_REGION,
      AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    }

    // console.log("Environment variables check:")
    // Object.entries(requiredEnvVars).forEach(([key, value]) => {
    //   console.log(`${key}: ${value ? (key.includes("SECRET") ? "Set" : value) : "Missing"}`)
    // })

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      return NextResponse.json({ error: `Missing environment variables: ${missingVars.join(", ")}` }, { status: 500 })
    }

    const { filename, contentType } = await request.json()

    if (!filename || !contentType) {
      return NextResponse.json({ error: "Filename and content type are required" }, { status: 400 })
    }

    console.log("Creating S3 client...")
    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })

    const key = `certificates/${uuidv4()}-${filename}`
    console.log("Generating presigned URL for key:", key)

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 600, // 10 minutes
    })

    console.log("Presigned URL generated successfully")
    console.log("URL:", url)
    console.log("Fields:", Object.keys(fields))

    return NextResponse.json({ url, fields, key })
  } catch (error) {
    console.error("S3 error:", error)
    return NextResponse.json(
      {
        error: "Failed to create upload URL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
