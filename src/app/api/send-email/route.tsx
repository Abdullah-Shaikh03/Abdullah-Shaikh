import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import ContactEmail from '@/emails/ContactEmail';
import { render } from '@react-email/components';

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return new Response('Missing required fields', { status: 400 });
  }

  // ✅ Await the render function since it returns a Promise<string>
  const emailHtml = await render(
    <ContactEmail
      name={name}
      email={email}
      subject={subject}
      message={message}
    />
  );

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  // ✅ Add try-catch for better error handling
  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO!,
      subject: `Contact Form: ${subject}`,
      replyTo: email,
      html: emailHtml, // Now this is a string, not a Promise<string>
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response('Failed to send email', { status: 500 });
  }
}