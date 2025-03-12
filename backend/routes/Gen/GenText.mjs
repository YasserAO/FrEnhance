import express, { response } from "express";
import textOnlyTemplate from "../../templates/textOnly.mjs";
import textOnlyTemplateJSON from "../../templates/textOnlyJSON.mjs";
import chatCompletion from "../../core/chatCompletion.mjs";
import { convertPromptToJSON } from "../../utils/func/textToJson.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { matchedData, checkSchema } from "express-validator";
import { textGenSchema } from "../../Schema/validation/textGenerate.mjs";
import { validResult } from "../../middleware/validResults.mjs";
import { coinsConsume } from "../../utils/func/coinsConsume.mjs";
import textRegenTemplate from "../../templates/textRegenTemplate.mjs";
import textRfineTemplate from "../../templates/textRfineTemplate .mjs";
const router = express.Router();

router.post(
  "/api/generate/text",
  isLoggedIn,
  checkSchema(textGenSchema),
  validResult,
  async (request, response) => {
    const textData = matchedData(request);
    const User = request.user;
    let { level, theme } = request.body;
    const myMessage = textOnlyTemplate(level, theme);
    const Purchase = await coinsConsume(User.id, level);
    if (Purchase) {
      const MyPrompt = await chatCompletion(myMessage, 0);
      if (!MyPrompt) return response.status(200).send({ msg: "No response" });
      const myJson = convertPromptToJSON(MyPrompt);

      return response.status(200).send({ status: 200, content: myJson });
    } else {
      return response.status(200).send({ msg: "Not Enough Credits" });
    }
  }
);

router.post(
  "/api/generate/textJSON",
  isLoggedIn,
  checkSchema(textGenSchema),
  validResult,
  async (request, response) => {
    const textData = matchedData(request);
    const User = request.user;
    let { level, theme } = request.body;
    const myMessage = textOnlyTemplateJSON(level, theme);
    const Purchase = await coinsConsume(User.id, level);
    if (Purchase) {
      const MyPrompt = await chatCompletion(myMessage, 1);
      if (!MyPrompt) return response.status(200).send({ msg: "No response" });
      try {
        const JSONResponse = JSON.parse(MyPrompt);
        return response.status(200).send({ status: 200, ...JSONResponse });
      } catch (err) {
        console.log(err.message);
        return response.status(200).send({ status: 500, msg: "No response" });
      }
    } else {
      return response.status(200).send({ msg: "Not Enough Credits" });
    }
  }
);

router.post(
  "/api/generate/textRegen",
  isLoggedIn,
  async (request, response) => {
    const { text, title, regen } = request.body;
    const myMessage = textRegenTemplate(text, title, regen);

    const MyPrompt = await chatCompletion(myMessage, 1, 1);
    if (!MyPrompt)
      return response.status(200).send({ status: 500, msg: "No response" });
    try {
      const JSONResponse = JSON.parse(MyPrompt);
      return response.status(200).send({ status: 200, ...JSONResponse });
    } catch (err) {
      console.log(err.message);
      return response.status(200).send({ status: 500, msg: "No response" });
    }
  }
);

router.post(
  "/api/generate/textRefine",
  isLoggedIn,
  async (request, response) => {
    const { text, title, instruction } = request.body;
    const myMessage = textRfineTemplate(text, title, instruction);

    const MyPrompt = await chatCompletion(myMessage, 1, 1);
    if (!MyPrompt)
      return response.status(200).send({ status: 500, msg: "No response" });
    try {
      const JSONResponse = JSON.parse(MyPrompt);
      return response.status(200).send({ status: 200, ...JSONResponse });
    } catch (err) {
      console.log(err.message);
      return response.status(200).send({ status: 500, msg: "No response" });
    }
  }
);
export default router;
