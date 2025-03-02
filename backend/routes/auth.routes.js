import express from "express";
import {
  checkAuth,
  signIn,
  signOut,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

authRouter.put("/update-profile", protectRoute, updateProfile);

authRouter.get("/check-auth", protectRoute, checkAuth);

export default authRouter;
