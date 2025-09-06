import { dbConnect } from "@/lib/dbConfig";
import Certificate from "@/models/certificates";
import { NextResponse } from "next/server";
import { z } from "zod";
import s3 from "@/lib/s3Config";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";


const certificateSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(1000),
    image: z.string().url(),
    date: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }, {
        message: "Invalid date format. Expected format: YYYY-MM-DD",
    }),
});

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const parsed = certificateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error }, { status: 400 });

        }
        const { title, description, image, date } = parsed.data;
        const imageUrl = new URL(image);
        const imageKey = imageUrl.pathname.substring(1); // Remove leading '/'
        const certificate = new Certificate({
            title,
            description,
            image: imageKey,
            date: new Date(date),
        })
        await certificate.save();
        return NextResponse.json(certificate, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}