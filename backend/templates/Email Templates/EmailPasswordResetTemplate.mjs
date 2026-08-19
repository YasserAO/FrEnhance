export const EmailPasswordResetTemplate = (USERNAME, THEURL) => {
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
  <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">Password Reset Request</h2>
  <p style="color: #475569; font-size: 15px; line-height: 1.6;">
    Hello <strong style="color: #0f172a;">${USERNAME}</strong>,
  </p>
  <p style="color: #475569; font-size: 15px; line-height: 1.6;">
    We received a request to reset the password associated with your account.
  </p>
  <p style="color: #475569; font-size: 15px;">Click the button below to choose a new password:</p>
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
      >Reset Your Password</a
    >
  </div>
  <p style="color: #64748b; font-size: 13px;">Can't click the button? <a href="${THEURL}" style="color: #0284c7; text-decoration: underline;">Click here to reset your password</a></p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
  <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
    If you didn't request a password reset, you can safely ignore this email — your account remains secure.<br />
    <em>This is an automated no-reply message. Please do not reply directly to this email.</em>
  </p>
</div>
`;
};
