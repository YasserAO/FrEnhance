export const EmailPasswordResetTemplate = (USERNAME, THEURL) => {
  return `<div
  style="
    max-width: 600px;
    margin: auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  "
>
  <h2 style="color: #333">Email Verification</h2>
  <p style="color: #555">
    Hello <span style="font-weight: bold">${USERNAME}</span>
    We received a request to Reset your Password. 
  </p>
  
  <p>Click the Button below:</p>
  <a
    href="${THEURL}"
    style="
      display: inline-block;
      background-color: #28a745;
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    "
    >Reset Your Password</a
  >
  <p>can't see the Button ? <a href="${THEURL}">(click Here)</a></p>
  <p style="color: #777; margin-top: 20px">
    If you didn't request a password Reset, you can safely ignore this
    email.
  </p>
</div>
`;
};
