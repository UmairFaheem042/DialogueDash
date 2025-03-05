import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.get("/auth/check-auth");
      set({ authUser: response.data });
    } catch (error) {
      console.log(error.message);
      set({ authUser: null });
    } finally {
      // setTimeout(() => {
      set({ isCheckingAuth: false });
      // }, 5000);
    }
  },

  signUp: async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/sign-up", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        profilePice: formData.profilePice,
      });
      set({ authUser: response.data.user });
      toast.success("Sign Up successfull!!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  },

  signIn: async (formData) => {
    try {
      console.log(formData);
      set({ isCheckingAuth: true });
      const response = await axiosInstance.post("/auth/sign-in", {
        email: formData.email,
        password: formData.password,
      });
      set({ authUser: response.data.user });
      toast.success("Sign In successfull!!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      // setTimeout(() => {
      set({ isCheckingAuth: false });
      // }, 5000);
    }
  },

  signOut: async (navigate) => {
    try {
      const response = await axiosInstance.post("/auth/sign-out");
      toast.success("Sign Out Successful");
      set({ authUser: null });
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  },
}));
