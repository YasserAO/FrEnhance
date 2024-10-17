import express, { text } from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
const router = express.Router();

router.get("/api/text/editedtext", isLoggedIn, async (request, response) => {
  const { user } = request;
  console.log("This is an EditText Get REquest");

  let myText;
  try {
    const myUserModel = await UserModel.findById(user.id);
    myText = myUserModel.editText;
  } catch (err) {
    console.error(err.message);
    return response.send({
      status: 500,
      message: "Error Happened while fetching",
    });
  }
  console.log(myText.title);
  if (!myText.title || !myText.text) {
    return response.status(200).send({ status: 404, msg: "No Text saved" });
  }

  console.log("Text was found");
  return response
    .status(200)
    .send({ status: 200, msg: "Text was found", content: myText });
});

export default router;
