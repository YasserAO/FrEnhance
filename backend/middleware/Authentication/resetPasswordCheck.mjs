import { URLPassToken } from "../../Schema/mongoose/urlPassToken.mjs";
import { getUserByID } from "../../utils/func/getUserByID.mjs";
import { hashpassword } from "../../utils/func/helper.mjs";

export const resetPasswordCheck = async (request, response) => {
  const { Token } = request.body;
  const now = new Date();
  let TokenObject;
  try {
    TokenObject = await URLPassToken.findOne({ Token: Token });
    if (!TokenObject) throw Error("Token was not Found");
  } catch (err) {
    return response.status(200).send({
      status: 404,
      msg: "Invalid or expired link",
    });
  }
  if (now > TokenObject.expiresAT) {
    return response.status(200).send({
      status: 400,
      title: "Link Expired",
      msg: "The link has expired. Please request a new password reset.",
    });
  }

  const User = await getUserByID(TokenObject.userID);
  if (!User) {
    return response.status(200).send({ status: 404, msg: "User does not exist" });
  }

  return response.status(200).send({
    status: 200,
    msg: "Success",
  });
};

