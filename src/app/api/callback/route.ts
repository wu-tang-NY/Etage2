import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailgun';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Send email via Mailgun
    const emailHtml = `
      <h2>New Callback Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Request Time:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}</p>
    `;

    try {
      await sendEmail({
        to: process.env.NOTIFICATION_EMAIL || 'stoleurbike@gmail.com',
        subject: `Callback Request from ${name}`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails - log it but don't fail the request
      // This ensures the user gets a success response even if email has issues
    }

    console.log('Callback request processed:', { name, phone });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling callback request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

