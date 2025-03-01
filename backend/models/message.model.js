import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver ID is required"],
    },
    text: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    image: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
