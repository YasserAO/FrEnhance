import express, { text } from "express";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { UserModel } from "../../Schema/mongoose/userModele.mjs";
const router = express.Router();

router.get("/api/text/editedtext", isLoggedIn, async (request, response) => {
  const { user } = request;

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
  if (!myText)
    return response
      .status(200)
      .send({ status: 404, msg: "Text was not Found" });
  return response
    .status(200)
    .send({ status: 200, msg: "Text was found", content: myText });
});

export default router;
