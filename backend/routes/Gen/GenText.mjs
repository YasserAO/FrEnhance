import express from "express";
import textOnlyTemplate from "../../templates/textOnly.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";
import { convertPromptToJSON } from "../../utils/func/textToJson.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { matchedData, checkSchema } from "express-validator";
import { textGenSchema } from "../../Schema/validation/textGenerate.mjs";
import { validResult } from "../../middleware/validResults.mjs";
import { coinsConsume } from "../../utils/func/coinsConsume.mjs";
const router = express.Router();

router.post(
  "/api/generate/text",
  isLoggedIn,
  checkSchema(textGenSchema),
  validResult,
  async (request, response) => {
    const textData = matchedData(request);
    const User = request.user;
    console.log(textData);

    let { level, theme } = request.body;
    const myMessage = textOnlyTemplate(level, theme);
    const Purchase = await coinsConsume(User.id, level);
    if (Purchase) {
      const MyPrompt = await chatCompletion(myMessage, 0);
      if (!MyPrompt) return response.status(200).send({ msg: "No response" });
      console.log(MyPrompt);
      const myJson = convertPromptToJSON(MyPrompt);
      // console.log(myJson);
      console.log({ status: 200 }, myJson);

      return response.status(200).send({ status: 200, content: myJson });
    } else {
      return response.status(200).send({ msg: "Not Enough Credits" });
    }
  }
);

export default router;
