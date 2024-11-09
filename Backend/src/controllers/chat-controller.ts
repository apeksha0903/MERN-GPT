// controllers/chat-controller.js
import { model, generationConfig } from "../config/gemini-configure.js";
import { Request, Response, NextFunction } from "express";
import User from "../modules/user.js";
import user from "../modules/user.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    // Adjust chats to fit required structure, including `parts` as objects with `text` property
    const chats = user.chats.map(({ role, content }) => ({
      role: role === "assistant" ? "model" : role,
      parts: [{ text: content }],
    }));
    chats.push({ role: "user", parts: [{ text: message }] }); // Add user message
    user.chats.push({ content: message, role: "user" }); // Save user message to DB

    // Initialize chat session with Gemini API using updated chats format
    const chatSession = model.startChat({
      generationConfig,
      history: chats,
    });

    const result = await chatSession.sendMessage(message);
    const botResponse = result.response.text();

    // Save bot's response with `role` as `bot` and `parts` structure
    user.chats.push({ content: botResponse, role: "model" });

    // Update user record in the database
    await user.save();

    // Send response back to the UI
    res.status(200).json({ chats:user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Something went wrong" });
    next(error); // Pass error to the error handler
  }
};

export const sendAllChatsToUser = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  //get all users from database.
  try {
      const existingUser = await User.findById(res.locals.jwtData.id);
      if(!existingUser){
          return res.status(401).send("User is not registered for token");
      }
      if(existingUser._id.toString() !== res.locals.jwtData.id){
          return res.status(401).send("Permissions do not match");
      }
      return res.status(200).json({message: "OK",chats:existingUser.chats});
  } catch (error) {
      console.log(error);
      return res.status(200).json({message: "ERROR",cause: error.message});
  }
} 

export const deleteAllChats = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  //get all users from database.
  try {
      const existingUser = await User.findById(res.locals.jwtData.id);
      if(!existingUser){
          return res.status(401).send("User is not registered for token");
      }
      if(existingUser._id.toString() !== res.locals.jwtData.id){
          return res.status(401).send("Permissions do not match");
      }
      //@ts-ignore
      existingUser.chats=[];
      await existingUser.save();
      return res.status(200).json({message: "OK"});
  } catch (error) {
      console.log(error);
      return res.status(200).json({message: "ERROR",cause: error.message});
  }
} 