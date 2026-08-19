import express, { text } from "express";
import { TextModel } from "../../Schema/mongoose/savedTextModele.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { validResult } from "../../middleware/validResults.mjs";

const router = express.Router();

router.get("/api/text", isLoggedIn, validResult, async (request, response) => {
  const { user } = request;

  let myText = [];
  try {
    myText = await TextModel.find({
      $or: [
        { "access.user": user.username },
        { "access.user": user.email },
        { access: { user: user.username } },
      ],
    }).sort({ _id: -1 });
  } catch (err) {
    console.error("Error finding texts:", err);
  }
  if (!myText || myText.length === 0)
    return response.status(200).send({ status: 204, msg: "No Text saved" });
  const textArray = myText.map((element) => ({
    title: element.title,
    text: element.text,
    id: element._id,
  }));

  return response.status(200).send({ status: 200, content: textArray });
});

export default router;
