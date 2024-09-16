import express from "express";
import routes from "./backend/routes/index.mjs";
import DBConnect from "./backend/database/mongoose.mjs";

const app = express();
await DBConnect();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
