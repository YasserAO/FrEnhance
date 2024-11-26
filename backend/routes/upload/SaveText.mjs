import express from "express";
import { TextModel } from "../../Schema/mongoose/savedTextModele.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { matchedData, checkSchema } from "express-validator";
import { textSaveSchema } from "../../Schema/validation/textGenerate copy.mjs";
import { validResult } from "../../middleware/validResults.mjs";
const router = express.Router();

router.post(
  "/api/save/text",
  isLoggedIn,
  checkSchema(textSaveSchema),
  validResult,
  async (request, response) => {
    const { user } = request;
    const textData = matchedData(request);
    console.log(textData);

    const createText = new TextModel({
      access: { user: user.username },
      title: textData.title,
      text: textData.text,
      savebutton: textData.savebutton,
    });
    let Err;
    try {
      const savedText = await createText.save();
    } catch (err) {
      console.log(err);
    }

    return response.status(200).send({ status: 200, msg: "text Saved" });
  }
);

export default router;
