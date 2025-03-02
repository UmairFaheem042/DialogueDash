import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // jwt is the saved name of the token

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorized!! - No token found",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "Unauthorized!! - Token invalid",
      });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while checking authenticated user!!",
      error: error.message,
    });
  }
};
