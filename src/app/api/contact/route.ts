// app/api/contact/route.ts
import React from "react"
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import ContactMessageEmail from "@/emails/ContactMessageEmail";

// Force the Node.js runtime (Nodemailer won't work on the edge runtime)
export const runtime = "nodejs";

type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    CONTACT_FROM_EMAIL,
    CONTACT_FROM_NAME,
    CONTACT_TO_EMAIL,
    SITE_URL,
    BRAND_NAME,
} = process.env;

function isEmail(str: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}
const sanitize = (s: string) => s.replace(/\s+/g, " ").trim();

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Partial<ContactPayload>;

        const name = sanitize(String(body.name ?? ""));
        const email = sanitize(String(body.email ?? ""));
        const subject = sanitize(String(body.subject ?? ""));
        const message = String(body.message ?? "").trim();

        const errors: Record<string, string> = {};
        if (!name) errors.name = "Name is required.";
        if (!email) errors.email = "Email is required.";
        if (email && !isEmail(email)) errors.email = "Invalid email address.";
        if (!subject) errors.subject = "Subject is required.";
        if (!message) errors.message = "Message is required.";
        if (name.length > 100) errors.name = "Name is too long.";
        if (subject.length > 150) errors.subject = "Subject is too long.";
        if (message.length > 5000) errors.message = "Message is too long.";

        if (Object.keys(errors).length) {
            return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
        }

        // Build email content using your React Email template
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        const html = await render(
            React.createElement(ContactMessageEmail, {
                name,
                senderEmail: email,
                subject,
                message,
                ip,
                submittedAt: new Date(),
                siteUrl: process.env.SITE_URL,
                brandName: process.env.BRAND_NAME,
            })
        );

        const text = `
New contact message

From: ${name} <${email}>
IP: ${ip}

Subject: ${subject}

Message:
${message}
`.trim();

        // Ensure config is present
        if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
            console.warn("SMTP or contact env vars missing; see README/env snippet.");
            return NextResponse.json(
                { error: "Email service is not configured. Please try again later." },
                { status: 503 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: String(SMTP_SECURE ?? "false") === "true", // true for port 465, false for others
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
            // Optional DKIM (uncomment and set envs if you have them)
            // dkim: {
            //   domainName: process.env.DKIM_DOMAIN!,
            //   keySelector: process.env.DKIM_SELECTOR!,
            //   privateKey: process.env.DKIM_PRIVATE_KEY!,
            // },
        });

        const fromName = CONTACT_FROM_NAME || "Website";
        const from = `${fromName} <${CONTACT_FROM_EMAIL}>`;

        const info = await transporter.sendMail({
            from,
            to: CONTACT_TO_EMAIL,
            replyTo: email, // lets you reply directly to the sender
            subject: `[Portfolio] ${subject}`,
            html,
            text,
        });

        // Optionally log message id for debugging
        console.log("Message sent:", info.messageId);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact route error:", err);
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
}
