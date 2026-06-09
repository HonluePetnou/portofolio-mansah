import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendMailOptions) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  if (!user || !pass) {
    throw new Error("GMAIL_USER and GMAIL_PASS environment variables must be defined");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  // Send mail
  const info = await transporter.sendMail({
    from: `"Frederic Armel Mansah" <${user}>`,
    to,
    subject,
    html,
  });

  return info;
}

export function getEmailTemplate(content: string, name: string) {
  // Replace newlines with paragraph tags
  const paragraphs = content
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p style="margin-bottom: 16px; color: #374151; font-size: 15px; line-height: 1.6;">${p}</p>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            padding: 24px;
            margin: 0;
          }
        </style>
      </head>
      <body style="background-color: #f9fafb; padding: 24px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="font-size: 18px; font-weight: 800; color: #5e50f9; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em;">
            Mansah Portfolio
          </div>
          <div style="font-size: 15px; line-height: 1.6; color: #374151;">
            <p style="margin-bottom: 16px; font-weight: 600; color: #111827;">Bonjour ${name},</p>
            ${paragraphs}
            <div style="margin-top: 32px; padding-top: 16px; border-t: 1px solid #f3f4f6;">
              <p style="margin: 0; font-weight: 700; color: #111827;">Cordialement,</p>
              <p style="margin: 4px 0 0 0; font-weight: 700; color: #5e50f9;">Honlue Petnou Frederic Armel (Mansah)</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280; font-weight: 500;">Ingénieur Logiciel & Spécialiste QA Automation</p>
            </div>
          </div>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; line-height: 1.5; text-align: center;">
            Cet e-mail a été généré suite à votre message envoyé sur <a href="https://mansah.dev" style="color: #5e50f9; text-decoration: none;">mansah.dev</a>.<br>
            © ${new Date().getFullYear()} Mansah. Tous droits réservés.
          </div>
        </div>
      </body>
    </html>
  `;
}
