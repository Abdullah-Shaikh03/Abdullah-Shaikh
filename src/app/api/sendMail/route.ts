import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email, name, contact, subject, message } = await req.json();
    if (!email || !name || !contact || !subject || !message) {
      return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 });
    }

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      html: `
            <div style="background-color: hsl(var(--background)); padding: 20px;">
                <h2 style="color: hsl(var(--foreground));">New Email</h2>
                <p style="color: hsl(var(--foreground));">Name: ${name}</p>
                <p style="color: hsl(var(--foreground));">Email: ${email}</p>
                <p style="color: hsl(var(--foreground));">Contact: ${contact}</p>
                <p style="color: hsl(var(--foreground));">Subject: ${subject}</p>
                <p style="color: hsl(var(--foreground));">Message: ${message}</p>
            </div>
        `,
    };

    const results = await transporter.sendMail(mailOption);
    return NextResponse.json({ message: "Mail sent successfully", results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
