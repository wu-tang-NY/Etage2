import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailgun';

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

    // Send email via Mailgun
    const emailHtml = `
      <h2>New Feedback Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>From:</strong> ${from}</p>
      <p><strong>Comment:</strong></p>
      <p>${comment.replace(/\n/g, '<br>')}</p>
      <p><strong>Received At:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}</p>
    `;

    try {
      await sendEmail({
        to: process.env.NOTIFICATION_EMAIL || 'stoleurbike@gmail.com',
        subject: `Feedback from ${name}`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails
    }

    console.log('Feedback request processed:', { name, phone, from, comment });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling feedback request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

