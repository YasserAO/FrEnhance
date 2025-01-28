import { matchedData } from "express-validator";
import { URLPassToken } from "../../Schema/mongoose/urlPassToken.mjs";
import { getUserByID } from "../../utils/func/getUserByID.mjs";
import { hashpassword } from "../../utils/func/helper.mjs";

export const resetPasswordLink = async (request, response) => {
  const { Token, password } = matchedData(request);
  const now = new Date();
  console.log("Your Token is :", Token);
  let TokenObject;
  try {
    TokenObject = await URLPassToken.findOne({ Token: Token });
    if (!TokenObject) throw Error("Token was not Found");
  } catch (err) {
    console.error(
      "Problem accured Trying to find the Token ERROR Message:\n",
      err.message
    );
    return response.status(200).send({
      status: 404,
      title: "Invalid Link",
      msg: "The link you used is invalid. Please check your email for a valid link or request a new one if needed.",
    });
  }
  if (now > TokenObject.expiresAT) {
    console.error("Token is expired");
    return response.status(200).send({
      status: 400,
      title: "Link Expired",
      msg: "The link has expired. To verify your email, request a new link.",
    });
  }

  const User = await getUserByID(TokenObject.userID);
  if (!User) {
    console.error("User doesn't exist");
    return response
      .status(200)
      .send({ status: 404, msg: "User doesn't exist" });
  }

  User.password = hashpassword(password);

  try {
    await User.save();
    response.status(200).send({
      status: 200,
      title: "Password Changed Successfully",
      msg: "Your password has been rest Successfully , Login to your Account with the new Password",
    });
  } catch (err) {
    response
      .status(200)
      .send({ status: 500, msg: "Something Went Wrong try later" });
  }

  try {
    await TokenObject.deleteOne();
  } catch (err) {
    console.error("Error Clearing used Token \nERROR MESSAGE: ", err.message);
  }
  return;
};
