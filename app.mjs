import chatRequest from "./backend/core/chatCompletion.mjs";
import express, { json } from "express";
import router from "./backend/routes/index.mjs";
import exerciceTemplate from "./backend/templates/exerciceTemplate.mjs";
import exercicehtml from "./backend/templates/exercicehtml.mjs";

const app = express();
app.use(express.json());
app.post("/api/basic", async (req, res) => {
  const { body } = req;
  if (!body.goal)
    return res.status(400).send({ msg: "please Specify an exercice goal" });
  if (!body.level)
    return res.status(400).send({ msg: "please Specify the level" });
  if (!body.lines)
    return res
      .status(400)
      .send({ msg: "please Specify how many lines needed" });
  const message = exerciceTemplate(body.goal, body.leve, body.lines);
  const resp = await chatRequest(message, 0);
  return res.status(200).send(resp);
});
app.get("/api/html", async (req, res) => {
  const docum = {
    goal: "learn conjugaison",
    level: "intermidéaire avancée",
    lines: "15",
  };
  const message = exercicehtml(docum.goal, docum.level, docum.lines);
  const resp = await chatRequest(message, 0);
  return res.status(200).send(resp);
});

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});

// Comment Has been Added in WorkPlace
