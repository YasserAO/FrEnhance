import express from "express";
import { matchedData, checkSchema } from "express-validator";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import { hashpassword } from "../../utils/func/helper.mjs";
import { registrationSchema } from "../../Schema/validation/RegisterSchema.mjs";
import { LogoAvatar } from "../../utils/func/avatarCreator.mjs";
import { validResult } from "../../middleware/validResults.mjs";

const router = express.Router();

router.post(
  "/api/user/reg",
  checkSchema(registrationSchema),
  validResult,
  async (request, response) => {
    let UserData = matchedData(request);
    UserData.password = hashpassword(UserData.password);
    UserData = { ...UserData, pfp: LogoAvatar(UserData) };
    let CreateUser;
    try {
      CreateUser = new UserModel(UserData);
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

      const SendUser = {
        username: SavedUser.username,
        email: SavedUser.email,
      };
      console.log(`${SendUser} Was Saved`);
      setTimeout(() => {
        return response
          .status(200)
          .send([{ msg: "User Saved Successfuly" }, SendUser]);
      }, 3000);
    } catch (err) {
      if (err.code === 11000) {
        const fieldName = Object.keys(err.keyValue)[0];
        setTimeout(() => {
          return response
            .status(400)
            .send([
              { msg: `${fieldName.toUpperCase()} is Already being used` },
            ]);
        }, 3000);
      }
    }
  }
);

export default router;
