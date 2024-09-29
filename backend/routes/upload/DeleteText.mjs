import express from "express";
import { TextModel } from "../../Schema/mongoose/savedTextModele.mjs";
import { isLoggedIn } from "../../middleware/isLoggedinCheck.mjs";
import { validResult } from "../../middleware/validResults.mjs";
import { textID } from "../../Schema/validation/validateID.mjs";
import { checkSchema, matchedData } from "express-validator";

const router = express.Router();

router.delete(
  "/api/text/delete",
  isLoggedIn,
  checkSchema(textID),
  validResult,
  async (request, response) => {
    const { user } = request;
    const myData = matchedData(request);

    let myText;
    try {
      const Mytext = await TextModel.findById(myData.id);
      if (!Mytext)
        return response
          .status(200)
          .send({ status: 404, msg: "text not found", id: myData.id });
      console.log("search for text");
      myText = Mytext;
    } catch (err) {
      console.error("Error Finding the Text", err.message);
      return response
        .status(200)
        .send({ status: 204, msg: "text id is Wrong" });
    }

    if (myText)
      try {
        if (myText.access.user == user.username) {
          console.log("Mytext is found");
          await myText.deleteOne();
          return response.status(200).send({
            status: 200,
            msg: "Text deleted Successfuly",
            id: myData.id,
          });
        } else {
          console.log("unAuthorized");
          return response
            .status(200)
            .send({ status: 401, msg: "UnAuthorized", id: myData.id });
        }
      } catch (err) {
        console.error("error Deleting the Text");
      }
    else
      return response
        .status(200)
        .send({ status: 400, msg: "Bad Request", id: myData.id });
  }
);

export default router;
