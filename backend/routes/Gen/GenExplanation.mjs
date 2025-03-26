import express from "express";
import chatCompletion from "../../core/chatCompletion.mjs";
import ExplainWords from "../../templates/ExplainWords.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { checkSchema, matchedData } from "express-validator";
import { ExplainBody } from "../../Schema/validation/explainWord.mjs";
import { validResult } from "../../middleware/validResults.mjs";
import { textToJsonExplanation } from "../../utils/func/textToJsonExplanation.mjs";
import { coinsConsume } from "../../utils/func/coinsConsume.mjs";
import CorrectMyInput from "../../templates/correctMyInput.mjs";

const router = express.Router();

router.post(
  "/api/generate/explain",
  isLoggedIn,
  checkSchema(ExplainBody),
  validResult,
  async (req, res) => {
    const User = req.user;
    const { context, words } = matchedData(req);
    const myMessage = ExplainWords(context, words);
    const Purchase = await coinsConsume(User.id);
    if (Purchase) {
      const myRespone = await chatCompletion(myMessage, 0);
      if (!myRespone)
        return res.status(200).send({ status: 204, msg: "No response" });
      const resultJSON = textToJsonExplanation(myRespone);
      return res
        .status(200)
        .send({ status: 200, msg: "success", content: resultJSON });
    } else {
      return response.status(200).send({ msg: "Not Enough Credits" });
    }
  }
);

router.post("/api/generate/correct", isLoggedIn, async (request, response) => {
  const { myinput } = request.body;
  const myMessage = CorrectMyInput(myinput.split(" "));
  const resultJSON = await chatCompletion(myMessage, 1, 0.2);
  console.log(JSON.parse(resultJSON));
  if (!resultJSON)
    return response.status(200).send({ status: 400, msg: "Wrong message" });
  return response.status(200).send({ status: 200, ...JSON.parse(resultJSON) });
});

export default router;
