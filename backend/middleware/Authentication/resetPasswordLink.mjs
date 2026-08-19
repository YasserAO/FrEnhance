import { matchedData } from "express-validator";
import { URLPassToken } from "../../Schema/mongoose/urlPassToken.mjs";
import { getUserByID } from "../../utils/func/getUserByID.mjs";
import { hashpassword } from "../../utils/func/helper.mjs";

export const resetPasswordLink = async (request, response) => {
  const { Token, password } = matchedData(request);
  const now = new Date();
  let TokenObject;
  try {
    TokenObject = await URLPassToken.findOne({ Token: Token });
    if (!TokenObject) throw Error("Token was not Found");
  } catch (err) {
    return response.status(200).send({
      status: 404,
      title: "Invalid Link",
      msg: "The link you used is invalid. Please check your email for a valid link or request a new one if needed.",
    });
  }
  if (now > TokenObject.expiresAT) {
    return response.status(200).send({
      status: 400,
      title: "Link Expired",
      msg: "The password reset link has expired. Please request a new one.",
    });
  }

  const User = await getUserByID(TokenObject.userID);
  if (!User) {
    return response
      .status(200)
      .send({ status: 404, msg: "User does not exist" });
  }

  User.password = hashpassword(password);

  try {
    await User.save();
    response.status(200).send({
      status: 200,
      title: "Password Changed Successfully",
      msg: "Your password has been reset successfully. You can now log in with your new password.",
    });
  } catch (err) {
    return response
      .status(200)
      .send({ status: 500, msg: "Something went wrong, please try again later" });
  }

  try {
    await TokenObject.deleteOne();
  } catch (err) {
    console.warn("[Password Reset] Could not clear used token:", err.message);
  }
  return;
};

