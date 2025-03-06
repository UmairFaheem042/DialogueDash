import express from "express";
import {
  checkAuth,
  deleteAccount,
  signIn,
  signOut,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const authRouter = express.Router();

// authRouter.post("/sign-up", signUp);
authRouter.post(
  "/sign-up",
  upload.fields([{ name: "image", maxCount: 1 }]),
  signUp
);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

authRouter.put(
  "/update-profile",
  protectRoute,
  upload.single("image"),
  updateProfile
);

authRouter.delete("/delete-account", protectRoute, deleteAccount);

authRouter.get("/check-auth", protectRoute, checkAuth);

export default authRouter;
