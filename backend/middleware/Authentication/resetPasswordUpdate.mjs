import { URLPassToken } from "../../Schema/mongoose/urlPassToken.mjs";
import { getUserByEmail } from "../../utils/func/getUserByEmail.mjs";
import { resetPassURL } from "../../utils/func/VerificationToken.mjs";

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
  return next();
};
