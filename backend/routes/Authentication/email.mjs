// Packages
import express from "express";
import { matchedData, checkSchema } from "express-validator";
import dotenv from "dotenv";

// DB // Schemas
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import { URLTokensModel } from "../../Schema/mongoose/urlToken.mjs";
import {
  emailVerificationCodeSchema,
  emailVerificationUrlSchema,
} from "../../Schema/validation/emailVerification.mjs";
import { EmailVerificationTemplate } from "../../templates/Email Templates/EmailVerificationTemplate.mjs";

// Function // Utils
import { sendVerification } from "../../connection/transporter.mjs";

// MiddleWares
import {
  validResult,
  validResultPrivate,
} from "../../middleware/validResults.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { getUserByID } from "../../utils/func/getUserByID.mjs";
import {
  verificationToken,
  verificationURL,
} from "../../utils/func/VerificationToken.mjs";

const router = express.Router();

dotenv.config();

// Send Verification CODE
router.post("/api/user/email-verify", isLoggedIn, async (request, response) => {
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

  User.verified = false;
  User.verification = verificationToken;
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

  const html = EmailVerificationTemplate(
    User.firstName,
    User.verification.verificationToken,
    process.env.LOCALHOST + "/email-verification/" + TokenObject.Token
  );
  try {
    sendVerification(User.email, "Email Verification", html);
  } catch (err) {
    console.error("Error Sending the Email \n ERROR MESSAGE:\n ", err.message);
  }
});

// Recive CODE Verification
router.post(
  "/api/user/email-verification",
  isLoggedIn,
  checkSchema(emailVerificationCodeSchema),
  validResult,
  async (request, response) => {
    const userID = request.user.id;
    const { code } = matchedData(request);
    const User = await getUserByID(userID);
    const now = new Date();

    if (User.verified) {
      return response
        .status(200)
        .send({ status: 200, msg: "User is Already Verified" });
    }
    if (
      User.verification.verificationToken == undefined ||
      User.verification.expiresAT == undefined
    ) {
      return response.status(200).send({ status: 404, msg: "No token found" });
    }
    if (code !== User.verification.verificationToken) {
      return response.status(200).send({ status: 400, msg: "Wrong Token" });
    }
    if (
      code == User.verification.verificationToken &&
      now <= User.verification.expiresAT
    ) {
      User.verified = true;
      User.verification = undefined;

      try {
        await User.save();
        console.log("User is Verified successfully");
        return response
          .status(200)
          .send({ status: 200, msg: `User was Verified successfully` });
      } catch (err) {
        console.log("User isn't Verified");
        console.error(err.message);
        return response
          .status(200)
          .send({ status: 500, msg: `User isn't Verified` });
      }
    }
    if (
      code == User.verification.verificationToken &&
      now > User.verification.expiresAT
    ) {
      return response
        .status(200)
        .send({ status: 400, msg: `Token is expired Please Send a new One` });
    }

    return response.status(200).send({ msg: `Nothing Happened` });
  }
);

// URL Verification
router.post(
  "/api/user/email-verificationURL",
  checkSchema(emailVerificationUrlSchema),
  validResultPrivate,
  async (request, response) => {
    const { Token } = matchedData(request);
    const now = new Date();
    console.log("Your Token is :", Token);
    let TokenObject;
    try {
      TokenObject = await URLTokensModel.findOne({ Token: Token });
      if (!TokenObject) throw Error("Token was not Found");
    } catch (err) {
      console.error(
        "Problem accured Trying to find the Token ERROR Message:\n",
        err.message
      );
      return response.status(200).send({
        status: 404,
        title: "Invalid Verification Link",
        msg: "The link you used is invalid. Please check your email for a valid verification link or request a new one if needed.",
      });
    }
    if (now > TokenObject.expiresAT) {
      console.error("Token is expired");
      return response.status(200).send({
        status: 400,
        title: "Verification Link Expired",
        msg: "The verification link has expired. To verify your email, request a new verification link.",
      });
    }

    const User = await getUserByID(TokenObject.userID);
    if (!User) {
      console.error("User doesn't exist");
      return response
        .status(200)
        .send({ status: 404, msg: "User doesn't exist" });
    }

    User.verified = true;
    User.verification = undefined;

    try {
      await User.save();
      response.status(200).send({
        status: 200,
        title: "Email Verified Successfully",
        msg: "Thank you for verifying your email! Your account is now active and ready to use.",
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
  }
);

export default router;
