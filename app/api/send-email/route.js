import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, subject, message } = await request.json();

  try {
    const result = await resend.emails.send({
      from: 'The LBB Fishing Crew <onboarding@resend.dev>',
      to: email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 20px auto;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #f5f5f5;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                color: #0d0d0d;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: bold;
              }
              .tagline {
                margin: 10px 0 0 0;
                font-size: 14px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .content {
                margin: 30px 0;
              }
              .content p {
                margin: 15px 0;
                font-size: 15px;
                color: #555;
              }
              .content strong {
                color: #0d0d0d;
              }
              .cta-section {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 6px;
                margin: 30px 0;
                text-align: center;
              }
              .cta-button {
                display: inline-block;
                background-color: #f5f5f5;
                color: #0d0d0d;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 13px;
                letter-spacing: 1px;
                margin-top: 10px;
              }
              .footer {
                text-align: center;
                border-top: 1px solid #eee;
                padding-top: 20px;
                margin-top: 30px;
                font-size: 12px;
                color: #999;
              }
              .footer p {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎣 The LBB Fishing Crew</h1>
                <p class="tagline">Locals Only</p>
              </div>

              <div class="content">
                <p>Hey there,</p>
                <p>Thanks for joining the crew! You're officially on our notification list.</p>
                <p><strong>We're bringing exclusive fishing apparel to the water soon.</strong> Premium drops, limited quantities, invitation-only access.</p>

                <div class="cta-section">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #0d0d0d;">Be the first to know when we launch</p>
                  <a href="https://localbeachbum.com" class="cta-button">Explore</a>
                </div>

                <p>Until then, we're out here fishing. Early access is coming soon for the crew.</p>
                <p>Stay tuned.</p>
                <p>– The LBB Team 🐟</p>
              </div>

              <div class="footer">
                <p>© 2026 Local Beach Bum. Locals Only.</p>
                <p>Premium fishing apparel for the crew.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}