import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const fromEmail = from || process.env.MAILGUN_FROM_EMAIL || `noreply@${domain}`;

  if (!apiKey || !domain) {
    throw new Error('Mailgun API key and domain must be configured');
  }

  const mg = mailgun.client({
    username: 'api',
    key: apiKey,
  });

  try {
    const result = await mg.messages.create(domain, {
      from: fromEmail,
      to: [to],
      subject,
      html,
    });

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
