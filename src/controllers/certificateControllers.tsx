import { type NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Certificate from "@/lib/certificateModel";

const getCertificateById = async () => {
  await dbConnect();
  try {
    const certificates = await Certificate.find({})
      .sort({ dateOfAcquisition: -1 })
      .lean()
      .exec();

    return NextResponse.json(certificates, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Database error in GET:", error);
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
    );
  }
};


export { getCertificateById };
