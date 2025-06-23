import { type NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"
import Certificate from "@/lib/certificateModel"

export async function GET() {
  try {
    await dbConnect()

    const certificates = await Certificate.find({}).sort({ dateOfAcquisition: -1 }).lean().exec()


    // Ensure we return a proper JSON response
    return NextResponse.json(certificates, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch certificates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()

    const { name, description, dateOfAcquisition, imageUrl } = body

    // Validate required fields
    if (!name || !description || !dateOfAcquisition || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    await dbConnect()

    const certificateData = {
      name,
      description,
      dateOfAcquisition: new Date(dateOfAcquisition),
      imageUrl: imageUrl, // Note: using imageUrl to match your schema
    }

    const certificate = new Certificate(certificateData)
    const result = await certificate.save()

    return NextResponse.json(
      {
        message: "Certificate created successfully",
        id: result._id,
        certificate: result,
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {

    // Handle specific MongoDB/Mongoose errors
    if (error instanceof Error) {
      if (error.message.includes("MONGO_URI")) {
        return NextResponse.json(
          { error: "Database configuration error" },
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }
      if (error.message.includes("authentication")) {
        return NextResponse.json(
          { error: "Database authentication failed" },
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }
      if (error.message.includes("network")) {
        return NextResponse.json(
          { error: "Database connection failed" },
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }
      if (error.name === "ValidationError") {
        return NextResponse.json(
          { error: "Validation error", details: error.message },
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }
    }

    return NextResponse.json(
      {
        error: "Failed to create certificate",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
