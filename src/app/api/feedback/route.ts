import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, from, comment } = body;

    if (!name || !phone || !from || !comment) {
      return NextResponse.json(
        { error: 'Name, phone, from, and comment are required' },
        { status: 400 }
      );
    }

    // TODO: Implement email sending via Mailgun
    // This should use server-side email service
    console.log('Feedback request:', { name, phone, from, comment });

    // In production, send email via Mailgun API
    // const mailgunApiKey = process.env.MAILGUN_API_KEY;
    // const mailgunDomain = process.env.MAILGUN_DOMAIN;
    // ... send email logic

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling feedback request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

