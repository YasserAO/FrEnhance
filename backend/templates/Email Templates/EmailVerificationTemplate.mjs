export const EmailVerificationTemplate = (USERNAME, CODE, THEURL) => {
  return `<div
  style="
    max-width: 600px;
    margin: 20px auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #334155;
  "
>
  <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">Email Verification</h2>
  <p style="color: #475569; font-size: 15px; line-height: 1.6;">
    Hello <strong style="color: #0f172a;">${USERNAME}</strong>,
  </p>
  <p style="color: #475569; font-size: 15px; line-height: 1.6;">
    We received a request to verify your email address. Here is your verification code:
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; text-align: center; margin: 20px 0;">
    <span style="font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #0284c7; font-family: monospace;">${CODE}</span>
  </div>
  <p style="color: #475569; font-size: 15px;">Or verify your account by clicking the button below:</p>
  <div style="text-align: center; margin: 24px 0;">
    <a
      href="${THEURL}"
      style="
        display: inline-block;
        background-color: #0284c7;
        color: #ffffff;
        padding: 12px 28px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 15px;
      "
      >Verify Your Email</a
    >
  </div>
  <p style="color: #64748b; font-size: 13px;">Can't click the button? <a href="${THEURL}" style="color: #0284c7; text-decoration: underline;">Click here to verify</a></p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
  <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
    If you didn't request an email verification, you can safely ignore this message.<br />
    <em>This is an automated no-reply message. Please do not reply directly to this email.</em>
  </p>
</div>
`;
};
