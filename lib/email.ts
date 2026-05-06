import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const APP_URL = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const url = `${APP_URL}/api/auth/verify-email?token=${token}`

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject: 'Verify your Lumen account',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#F6F3EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" width="100%" style="max-width:520px;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:28px;">
              <span style="font-family:Georgia,serif;font-size:20px;font-weight:500;color:#1A2620;letter-spacing:-0.02em;">Lumen</span>
            </td>
          </tr>
          <tr>
            <td style="background:#FBF8F1;border:1px solid #E5DFD0;border-radius:16px;padding:40px 44px;">
              <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:26px;font-weight:500;color:#1A2620;line-height:1.1;letter-spacing:-0.025em;">
                Verify your email.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#3D4842;line-height:1.6;">
                Click the button below to verify your email address and access your Lumen account.
                This link expires in <strong>24 hours</strong>.
              </p>
              <a href="${url}"
                style="display:inline-block;background:#1A2620;color:#F6F3EC;text-decoration:none;font-size:14px;font-weight:500;padding:14px 28px;border-radius:999px;letter-spacing:0.01em;">
                Verify email →
              </a>
              <p style="margin:28px 0 0;font-size:13px;color:#6B756F;line-height:1.5;">
                Or copy and paste this link into your browser:<br>
                <span style="color:#1F5041;word-break:break-all;">${url}</span>
              </p>
              <div style="margin:24px 0 0;padding-top:24px;border-top:1px solid #E5DFD0;">
                <p style="margin:0;font-size:13px;color:#A8ADA6;line-height:1.5;">
                  If you didn't create a Lumen account, you can safely ignore this email.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#A8ADA6;font-family:monospace;letter-spacing:0.08em;text-transform:uppercase;">
                © 2026 Lumen Health, Inc. · Not a substitute for medical advice.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  })

  if (error) {
    console.error('[Resend] Failed to send verification email:', JSON.stringify(error))
    throw new Error(`Email delivery failed: ${error.message}`)
  }

  console.log('[Resend] Verification email sent:', data?.id, '→', to)
}
