import express from "express";
import textOnlyTemplate from "../../templates/textOnly.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";
import { convertPromptToJSON } from "../../utils/func/textToJson.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { matchedData, checkSchema } from "express-validator";
import { textGenSchema } from "../../Schema/validation/textGenerate.mjs";
import { validResult } from "../../middleware/validResults.mjs";
const router = express.Router();

router.post(
  "/api/generate/text",
  isLoggedIn,
  // checkSchema(textGenSchema),
  // validResult,
  async (request, response) => {
    const textData = matchedData(request);
    console.log(textData);

    let { level, theme } = request.body;
    const myMessage = textOnlyTemplate(level, theme);
    const MyPrompt = await chatCompletion(myMessage, 0);
    if (!MyPrompt) return response.status(200).send({ msg: "No response" });

    console.log(MyPrompt);
    const myJson = convertPromptToJSON(MyPrompt);
    // console.log(myJson);
    console.log({ status: 200 }, myJson);

    return response.status(200).send({ status: 200, content: myJson });
  }
);

export default router;
