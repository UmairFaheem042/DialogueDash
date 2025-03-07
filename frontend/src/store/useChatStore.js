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
      //   toast.success(error.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    console.log("User ID: ", userId);

    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      // console.log(response.data.messages);
      set({ messages: response.data.messages });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data, userId) => {
    console.log(data);
    console.log(userId);
    try {
      const response = await axiosInstance.post(`/message/${userId}`, data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
}));
