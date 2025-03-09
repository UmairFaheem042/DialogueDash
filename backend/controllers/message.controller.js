import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../config/socket.js";
const { ObjectId } = mongoose.Types;

const fetchAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // fetch all users apart from the loggedInUser

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: filteredUsers,
    });
  } catch (error) {
    console.log("error in fetchAllUsers controller: ", error.message);
    res.status(500).json({
      success: true,
      message: "Error while fetching all the users",
      error: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: otherUserId } = req.params;
    const myId = req.user?._id;

    if (!myId || !otherUserId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request, user ID is missing",
      });
    }

    if (!ObjectId.isValid(myId) || !ObjectId.isValid(otherUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const senderObjectId = new ObjectId(myId);
    const receiverObjectId = new ObjectId(otherUserId);

    const messages = await Message.find({
      $or: [
        { senderId: senderObjectId, receiverId: receiverObjectId },
        { senderId: receiverObjectId, receiverId: senderObjectId },
      ],
    });
    res.status(200).json({
      success: true,
      messages: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log("error in getMessage controller: ", error.message);
    res.status(500).json({
      success: false,
      messages: "Error while getting messages",
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image, receiverId } = req.body;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Error while sending image",
          error: error.message,
        });
      }
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("error in sendMessage controller: ", error.message);
    res.status(500).json({
      success: false,
      messages: "Error while sending message",
      error: error.message,
    });
  }
};

export { fetchAllUsers, getMessages, sendMessage };
