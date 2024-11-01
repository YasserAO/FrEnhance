import express from "express";
import routes from "./backend/routes/index.mjs";
import DBConnect from "./backend/connection/mongoose.mjs";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import { syntaxError } from "./backend/middleware/SyntaxError.mjs";

dotenv.config();
const app = express();
await DBConnect();
app.set("trust proxy", 1);
const corsOptions = {
  origin: process.env.LOCALHOST,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(syntaxError);

app.use(
  session({
    secret: process.env.SKEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      // httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 24 * 1000,
    },

    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});
