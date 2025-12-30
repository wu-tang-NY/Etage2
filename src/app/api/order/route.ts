import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailgun';

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

    // Send email via Mailgun
    const emailHtml = `
      <h2>New Order Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${from ? `<p><strong>From:</strong> ${from}</p>` : ''}
      ${to ? `<p><strong>To:</strong> ${to}</p>` : ''}
      ${workers ? `<p><strong>Workers:</strong> ${workers}</p>` : ''}
      ${type ? `<p><strong>Type:</strong> ${type}</p>` : ''}
      ${date ? `<p><strong>Date:</strong> ${date}</p>` : ''}
      ${comment ? `<p><strong>Comment:</strong><br>${comment.replace(/\n/g, '<br>')}</p>` : ''}
      <p><strong>Received At:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' })}</p>
    `;

    try {
      await sendEmail({
        to: process.env.NOTIFICATION_EMAIL || 'stoleurbike@gmail.com',
        subject: `New Order from ${name}`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails
    }

    console.log('Order request processed:', { name, phone, from, to, workers, type, date, comment });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling order request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

