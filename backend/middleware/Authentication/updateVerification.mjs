import { getUserByID } from "../../utils/func/getUserByID.mjs";
import { URLTokensModel } from "../../Schema/mongoose/urlToken.mjs";
import {
  verificationToken,
  verificationURL,
} from "../../utils/func/VerificationToken.mjs";
import { EmailVerificationTemplate } from "../../templates/Email Templates/EmailVerificationTemplate.mjs";
import { sendVerification } from "../../connection/transporter.mjs";

export const updateVerification = async (request, response) => {
  const userID = request.user.id;
  const User = await getUserByID(userID);

  const now = new Date();
  if (!User)
    return response
      .status(200)
      .send({ status: 404, msg: "couldn't find the User" });

  if (User.verified === true)
    return response
      .status(200)
      .send({ status: 400, msg: "User is already verified" });
  if (User.verification.verificationCooldown) {
    if (now < User.verification.verificationCooldown)
      return response.status(200).send({ status: 403, msg: "Token Cooldown" });
  }
  User.verified = false;
  User.verification = verificationToken();
  console.log((User.verification.expiresAT - new Date()) / (1000 * 60));
  console.log(User.verification.verificationToken);
  let TokenObject = await URLTokensModel.findOne({ userID: userID });
  if (!TokenObject) TokenObject = new URLTokensModel(verificationURL(userID));
  if (now > TokenObject.expiresAT) {
    console.log(TokenObject);
    TokenObject.set(verificationURL(userID));
    console.log(TokenObject);
  }
  try {
    await TokenObject.save();
  } catch (err) {
    console.error(err.message);
  }

  try {
    await User.save();
    response
      .status(200)
      .send({ status: 200, msg: "Verification Code was Updated" });
  } catch (err) {
    console.log("Couldn't Save the User");
    return response
      .status(200)
      .send({ status: 500, msg: "Something Went Wrong , try Again" });
  }

  const clientUrl = process.env.CLIENT_URL || process.env.LOCALHOST || "https://frenhance.vendra.cfd";
  const html = EmailVerificationTemplate(
    User.firstName,
    User.verification.verificationToken,
    `${clientUrl}/email-verification/${TokenObject.Token}`
  );
  try {
    await sendVerification(User.email, "Verify Your Email Address", html);
  } catch (err) {
    console.error("[Email Verification] Error sending email:", err.message);
  }
};
