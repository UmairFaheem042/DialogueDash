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
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
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
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningIn: false });
      // setTimeout(() => {
      set({ isCheckingAuth: false });
      // }, 5000);
    }
  },

  signOut: async (navigate) => {
    try {
      await axiosInstance.post("/auth/sign-out");
      toast.success("Sign Out Successful");
      set({ authUser: null });
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
      console.log(response);
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
      console.log(id);

      // sign-out + delete-account
      await axiosInstance.post("/auth/sign-out");
      set({ authUser: null });
      navigate("/sign-in");
      toast.success("Account Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  },
}));
