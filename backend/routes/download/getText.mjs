import express, { text } from "express";
import { TextModel } from "../../Schema/mongoose/savedTextModele.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { validResult } from "../../middleware/validResults.mjs";

const router = express.Router();

router.get("/api/text", isLoggedIn, validResult, async (request, response) => {
  const { user } = request;

  let myText;
  const createText = TextModel.find({ access: { user: user.username } });

  try {
    myText = await createText;
  } catch (err) {
    console.log(err);
  }
  if (myText.length == 0)
    return response.status(200).send({ status: 204, msg: "No Text saved" });
  const textArray = myText.map((element) => ({
    title: element.title,
    text: element.text,
    id: element._id,
  }));

  return response.status(200).send({ status: 200, content: textArray });
});

export default router;
