import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import connectCloud from "./config/cloudinary.js";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

connectDB();
connectCloud();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port number`);
});
