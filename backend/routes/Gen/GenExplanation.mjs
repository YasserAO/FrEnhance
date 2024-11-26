import express from "express";
import chatCompletion from "../../core/chatCompletion.mjs";
import ExplainWords from "../../templates/ExplainWords.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { checkSchema, matchedData } from "express-validator";
import { ExplainBody } from "../../Schema/validation/explainWord.mjs";
import { validResult } from "../../middleware/validResults.mjs";
import { textToJsonExplanation } from "../../utils/func/textToJsonExplanation.mjs";

const router = express.Router();

router.post(
  "/api/generate/explain",
  isLoggedIn,
  checkSchema(ExplainBody),
  validResult,
  async (req, res) => {
    const { context, words } = matchedData(req);
    const myMessage = ExplainWords(context, words);
    console.log(myMessage);
    const myRespone = await chatCompletion(myMessage, 0);
    if (!myRespone)
      return res.status(200).send({ status: 204, msg: "No response" });
    const resultJSON = textToJsonExplanation(myRespone);
    console.log(myRespone);

    return res
      .status(200)
      .send({ status: 200, msg: "success", content: resultJSON });
  }
);

export default router;
