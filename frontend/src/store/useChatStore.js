import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
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
      set({ messages: [...get().messages, response.data.newMessage] });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
