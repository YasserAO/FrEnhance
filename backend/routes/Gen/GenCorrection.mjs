import express from "express";
import chatCompletion from "../../core/chatCompletion.mjs";
import correctMeTemplate from "../../templates/CorrectMe.mjs";

const router = express.Router();

router.post("/api/generate/correction", async (req, res) => {
  const { title, text, questions, answers } = req.body;
  const myMessage = correctMeTemplate(title, text, questions, answers);
  const jsonResponse = await chatCompletion(myMessage, 0);
  if (!jsonResponse) return res.status(200).send({ msg: "No response" });
  return res.status(200).send(jsonResponse);
});

export default router;
