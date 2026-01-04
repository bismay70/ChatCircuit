import express from "express";
import { protectRoute } from "../middleware/auth";
import { getUsersForSidebar,getMessages,markMessagesAsSeen } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUsersForSidebar);
messageRouter.post("/:id",protectRoute,getMessages);
messageRouter.put("mark/:id",protectRoute,markMessagesAsSeen);

export default messageRouter;