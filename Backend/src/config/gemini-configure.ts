// config/gemini-configure.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.AI_SECRET_KEY;
export const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
