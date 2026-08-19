import { createTransport } from "nodemailer";
import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const brevoApiKey =
  process.env.BREVO_API_KEY ||
  process.env.SMTPKEY ||
  process.env.smtpkey;

let brevoClient = null;
if (brevoApiKey && !brevoApiKey.startsWith("xkeysib-placeholder")) {
  try {
    brevoClient = new BrevoClient({ apiKey: brevoApiKey });
    console.log("[Email Service] Brevo Transactional API Client initialized");
  } catch (err) {
    console.warn("[Email Service] Failed to initialize BrevoClient:", err.message);
  }
}

// Fallback SMTP Transporter
const transporter = createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || process.env.USER,
    pass: process.env.SMTP_PASS || process.env.EPASSWORD,
  },
  logger: false,
  debug: false,
});

export const sendVerification = async (email, subject, html) => {
  const senderEmail = process.env.EMAIL_SENDER_ADDRESS || process.env.MAINEMAIL || "no-reply@vendra.cfd";
  const senderName = process.env.EMAIL_SENDER_NAME || "FrEnhance Security";
  const replyToEmail = process.env.EMAIL_REPLY_TO || "no-reply@vendra.cfd";

  // 1. Try Brevo REST API v3 first (Transactional Emails API)
  if (brevoClient) {
    try {
      const response = await brevoClient.transactionalEmails.sendTransacEmail({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [{ email }],
        replyTo: {
          email: replyToEmail,
          name: senderName,
        },
        subject,
        htmlContent: html,
        headers: {
          "X-Auto-Response-Suppress": "All",
          "Auto-Submitted": "auto-generated",
        },
      });

      console.log(`[Brevo API] Transactional email sent to ${email} (Message ID: ${response.messageId})`);
      return { success: true, messageId: response.messageId };
    } catch (err) {
      console.warn(`[Brevo API Error] ${err.message}. Attempting SMTP fallback...`);
    }
  }

  // 2. Fallback to SMTP Relay
  try {
    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject: subject,
      html: html,
      replyTo: replyToEmail,
      headers: {
        "X-Auto-Response-Suppress": "All",
        "Auto-Submitted": "auto-generated",
        "X-Mailer": "FrEnhance Transactional Mail Service",
        "Precedence": "bulk",
      },
    });

    console.log(`[SMTP Relay] Transactional email sent to ${email} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[Email Service Error] Failed to send email to ${email}: ${err.message}`);
    return { success: false, error: err.message };
  }
};
