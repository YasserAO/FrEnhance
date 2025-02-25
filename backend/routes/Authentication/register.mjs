// Packages
import express, { request } from "express";
import { matchedData, checkSchema } from "express-validator";

// DB // Schemas
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import { URLTokensModel } from "../../Schema/mongoose/urlToken.mjs";
import { registrationSchema } from "../../Schema/validation/RegisterSchema.mjs";

// Function // Utils
import { hashpassword } from "../../utils/func/helper.mjs";
import { LogoAvatar } from "../../utils/func/avatarCreator.mjs";
import {
  verificationToken,
  verificationURL,
} from "../../utils/func/VerificationToken.mjs";

// MiddleWares
import { validResult } from "../../middleware/validResults.mjs";
import { loginMiddleWare } from "../../middleware/Authentication/LoginMiddleware.mjs";
import { updateVerification } from "../../middleware/Authentication/updateVerification.mjs";

const router = express.Router();

router.post(
  "/api/user/reg",
  checkSchema(registrationSchema),
  validResult,
  async (request, response, next) => {
    const verification = verificationToken;
    let UserData = matchedData(request);
    UserData.password = hashpassword(UserData.password);
    UserData = {
      ...UserData,
      pfp: LogoAvatar(UserData),
      verification,
      verified: false,
    };

    let CreateUser;
    let CreateVerificationToken;
    try {
      CreateUser = new UserModel(UserData);
      CreateVerificationToken = new URLTokensModel(
        verificationURL(CreateUser.id)
      );
    } catch (err) {
      if (err) {
        console.log(err);
        console.log("err inside CreateUser");
        setTimeout(() => {
          return response.status(400).send([{ msg: "User Exist" }]);
        }, 3000);
      }
    }
    try {
      const SavedUser = await CreateUser.save();
      await CreateVerificationToken.save();
      const SendUser = {
        username: SavedUser.username,
        email: SavedUser.email,
      };
      console.log(`${SendUser} Was Saved`);
    } catch (err) {
      if (err.code === 11000) {
        const fieldName = Object.keys(err.keyValue)[0];

        return response
          .status(400)
          .send({ msg: `${fieldName.toUpperCase()} is Already being used` });
      } else console.log(err.message);
      return response
        .status(200)
        .send({ status: 500, msg: "something Wrong Try later" });
    }
    const loginUser = {
      username: request.body.username,
      password: request.body.password,
    };
    request.body = loginUser;
    request.NoLoginResponse = true;
    next();
  },

  loginMiddleWare,
  updateVerification
);

export default router;
