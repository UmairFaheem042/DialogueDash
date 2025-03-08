import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUser: [],
  socket: null,

  checkAuth: async () => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.get("/auth/check-auth");
      set({ authUser: response.data });

      // connect socket
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/sign-up", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      set({ authUser: response.data.user });
      toast.success("Sign Up successfull!!");

      // connect socket
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signIn: async (formData) => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.post("/auth/sign-in", {
        email: formData.email,
        password: formData.password,
      });
      set({ authUser: response.data.user });
      toast.success("Sign In successfull!!");

      // connect socket
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningIn: false });
      set({ isCheckingAuth: false });
    }
  },

  signOut: async (navigate) => {
    try {
      await axiosInstance.post("/auth/sign-out");
      toast.success("Sign Out Successful");
      set({ authUser: null });

      // disconnect socket
      get().disconnectSocket();
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data.user });
      toast.success("Profile updated successfully!!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  deleteAccount: async (id, navigate) => {
    try {
      await axiosInstance.post("/auth/sign-out");
      set({ authUser: null });

      // disconnect socket
      // get().disconnectSocket();
      navigate("/sign-in");
      toast.success("Account Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  },

  connectSocket: () => {
    try {
      const { authUser } = get();

      if (!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL);
      socket.connect();

      set({ socket: socket });
    } catch (error) {
      console.log(error);
    }
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
