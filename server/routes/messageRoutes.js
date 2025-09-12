import express from "express";
import { protectRoute } from "../middleware/auth";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUserForSidebar);
messageRouter.post("/add-message",protectRoute,getMessages);
