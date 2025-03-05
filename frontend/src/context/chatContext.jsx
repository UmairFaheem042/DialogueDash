import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/message/users",
        { withCredentials: true }
      );
      setAllUsers(response.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMessages = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/message/${id}`,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendMessage = async (id, message) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/message/${id}`,
        {
          text: message.text,
          image: message.image,
        },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ChatContext.Provider
      value={{ allUsers, messages, getUsers, getMessages, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
