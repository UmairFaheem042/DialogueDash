import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";

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
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId },
      ],
    }); // finding all messages in which either i am the user or receiver(params) is the user

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
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
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

    // realtime todo functionality => socket.io

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
