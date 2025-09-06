import ContactMessageEmail from '@/emails/ContactMessageEmail';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

interface Body {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: Body = await req.json();

        if (!body.email || !body.name || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Abdullah <no-reply@abdullah-shaikh.me>', // Replace with your verified domain later
            to: ['delivered@resend.dev', 'abdullah.sk0517@gmail.com'],
            subject: body.subject,
            react: ContactMessageEmail({
                name: body.name,
                senderEmail: body.email,
                subject: body.subject,
                message: body.message,
            }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err: unknown) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
