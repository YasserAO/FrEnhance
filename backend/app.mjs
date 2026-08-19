import express from "express";
import routes from "./routes/index.mjs";
import DBConnect from "./connection/mongoose.mjs";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import { syntaxError } from "./middleware/SyntaxError.mjs";

dotenv.config();
const app = express();
await DBConnect();
app.set("trust proxy", 1);

const allowedOrigins = [
  process.env.LOCALHOST,
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
  "https://frenhance.vendra.cfd",
  "http://frenhance.vendra.cfd",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(syntaxError);

app.use(
  session({
    secret: process.env.SKEY || "frenhance_default_secret_key_session",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 3600 * 1000,
    },

    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`FrEnhance Backend listening on port ${port}`);
});

