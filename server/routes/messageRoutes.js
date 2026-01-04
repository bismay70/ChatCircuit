import express from "express";
import { protectRoute } from "../middleware/auth";
import { getUsersForSidebar,getMessages,markMessagesAsSeen,sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUsersForSidebar);
messageRouter.post("/:id",protectRoute,getMessages);
messageRouter.put("mark/:id",protectRoute,markMessagesAsSeen);
messageRouter.post("/send/:id",protectRoute,sendMessage);

export default messageRouter;