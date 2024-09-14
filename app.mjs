import express from "express";
import routes from "./backend/routes/index.mjs";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
