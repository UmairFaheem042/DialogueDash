import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data.users });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ messages: response.data.messages });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data, userId) => {
    try {
      const response = await axiosInstance.post(`/message/${userId}`, data);
      console.log(response.data.newMessage);
      set({ messages: [...messages, response.data.newMessage] });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
}));
