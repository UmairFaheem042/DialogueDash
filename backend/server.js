import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import connectDB from "./config/db.js";
import connectCloud from "./config/cloudinary.js";

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

import { app, server } from "./config/socket.js";

config();

// const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port number`);
  connectDB();
  connectCloud();
});
