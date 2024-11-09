import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate,chatCompleteValidator } from "../utils/validators.js";
import { deleteAllChats, generateChatCompletion, sendAllChatsToUser } from "../controllers/chat-controller.js";


//Protected API
const chatsRoutes = Router()
chatsRoutes.post("/new",validate(chatCompleteValidator),verifyToken,generateChatCompletion);
chatsRoutes.get("/all-chats",verifyToken,sendAllChatsToUser);
chatsRoutes.delete("/delete-all",verifyToken,deleteAllChats)
export default chatsRoutes;