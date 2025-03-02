import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  fetchAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, fetchAllUsers);

messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/:id", protectRoute, sendMessage);

export default messageRouter;
