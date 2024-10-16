import express from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { matchedData, checkSchema } from "express-validator";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
import { validResult } from "../../middleware/validResults.mjs";
import { textSaveSchema } from "../../Schema/validation/textGenerate copy.mjs";
const router = express.Router();

router.post(
  "/api/save/editedtext",
  isLoggedIn,
  checkSchema(textSaveSchema),
  validResult,
  async (request, response) => {
    const { user } = request;
    const textData = matchedData(request);

    try {
      const UserData = await UserModel.findByIdAndUpdate(user.id, {
        editText: { title: textData.title, text: textData.text },
      });
    } catch (err) {
      console.error(err.message);
      return response.status(200).send({ status: 500, msg: "Error" });
    }

    return response.status(200).send({ status: 200, msg: "Edited text Saved" });
  }
);

export default router;
