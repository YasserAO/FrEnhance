import { URLPassToken } from "../../Schema/mongoose/urlPassToken.mjs";
import { getUserByID } from "../../utils/func/getUserByID.mjs";
import { hashpassword } from "../../utils/func/helper.mjs";

export const resetPasswordCheck = async (request, response) => {
  const { Token } = request.body;
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
      msg: "Wrong Link",
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
    return response.status(200).send({ status: 404, msg: "Wrong Link" });
  }

  return response.status(200).send({
    status: 200,
    msg: "Success",
  });

  return;
};
