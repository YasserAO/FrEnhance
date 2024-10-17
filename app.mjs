import express from "express";
import routes from "./backend/routes/index.mjs";
import DBConnect from "./backend/connection/mongoose.mjs";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";

dotenv.config();
const app = express();
await DBConnect();

const corsOptions = {
  origin: process.env.LOCALHOST,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(
  session({
    secret: process.env.SKEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 3600 * 24 * 1000,
    },
    
    secure: process.env.NODE_ENV === 'production',
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
