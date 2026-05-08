import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, subject, message } = await request.json();

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: `<h2>${subject}</h2><p>${message}</p>`,
    });

    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}