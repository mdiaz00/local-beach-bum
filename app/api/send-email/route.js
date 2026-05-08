import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, subject, message } = await request.json();

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0d0d0d; text-transform: uppercase; letter-spacing: 2px;">🎣 The LBB Fishing Crew</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">Hey there,</p>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">Thanks for joining the crew! You're officially on our notification list.</p>
          <p style="color: #555; font-size: 15px; line-height: 1.6;"><strong>We're bringing exclusive fishing apparel to the water soon.</strong></p>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">Premium drops, limited quantities, invitation-only access.</p>
          <p style="color: #999; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">© 2026 Local Beach Bum. Locals Only.</p>
        </div>
      `,
    });

    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}