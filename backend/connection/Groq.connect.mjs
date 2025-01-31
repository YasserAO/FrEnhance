import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groqConnect = new Groq({ apiKey: process.env.GROQ_API_KEY });

export { groqConnect };
