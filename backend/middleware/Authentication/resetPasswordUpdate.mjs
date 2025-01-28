import { sendVerification } from "../../connection/transporter.mjs";
import { URLPassToken } from "../../Schema/mongoose/urlPassToken.mjs";
import { EmailPasswordResetTemplate } from "../../templates/Email Templates/EmailPasswordResetTemplate.mjs";
import { getUserByEmail } from "../../utils/func/getUserByEmail.mjs";
import { resetPassURL } from "../../utils/func/VerificationToken.mjs";
import { configDotenv } from "dotenv";

export const resetPasswordUpdate = async (request, response, next) => {
  const now = new Date();
  const { email } = request.body;
  const User = await getUserByEmail(email);
  if (User === null) return next();
  let TokenObject = await URLPassToken.findOne({ userID: User.id });
  if (!TokenObject) TokenObject = new URLPassToken(resetPassURL(User.id));
  if (now > TokenObject.expiresAT) {
    console.log(TokenObject);
    TokenObject.set(resetPassURL(User.id));
    console.log(TokenObject);
  }
  try {
    await TokenObject.save();
  } catch (err) {
    console.error(err.message);
  }
  const html = EmailPasswordResetTemplate(
    User.username,
    process.env.LOCALHOST + "/auth/password-reset/" + TokenObject.Token
  );

  try {
    sendVerification(User.email, "Password Reset Request", html);
  } catch (err) {
    console.error("Error Sending the Email \n ERROR MESSAGE:\n ", err.message);
  }
  sendVerification();
  return next();
};
