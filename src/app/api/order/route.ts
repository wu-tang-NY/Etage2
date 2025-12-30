import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, from, to, workers, type, date, comment } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // TODO: Implement email sending via Mailgun
    // This should use server-side email service
    console.log('Order request:', { name, phone, from, to, workers, type, date, comment });

    // In production, send email via Mailgun API
    // const mailgunApiKey = process.env.MAILGUN_API_KEY;
    // const mailgunDomain = process.env.MAILGUN_DOMAIN;
    // ... send email logic

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling order request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

