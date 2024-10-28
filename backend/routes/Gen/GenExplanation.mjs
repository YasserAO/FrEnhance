import express from "express";
import chatCompletion from "../../core/chatCompletion.mjs";
import ExplainWords from "../../templates/ExplainWords.mjs";

const router = express.Router();

router.post("/api/generate/explain", async (req, res) => {
  const { context, words } = req.body;
  const myMessage = ExplainWords(context, words);
  const jsonResponse = await chatCompletion(myMessage, 0);
  if (!jsonResponse) return res.status(200).send({ msg: "No response" });
  return res.status(200).send(jsonResponse);
});

export default router;
