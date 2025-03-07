import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

import { Toaster } from "react-hot-toast";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Chats from "./pages/Chats";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={!authUser ? <HomePage /> : <Navigate to={"/chats"} />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to={"/chats"} />}
        />
        <Route
          path="/sign-in"
          element={!authUser ? <SignIn /> : <Navigate to={"/chats"} />}
        />

        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={authUser ? <Profile /> : <Navigate to="/" />}
        />

        <Route
          path="/chats"
          element={authUser ? <Chats /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notifications"
          element={authUser ? <>All Notifications</> : <Navigate to={"/"} />}
        />
        <Route
          path="/search"
          element={authUser ? <>All Users Search</> : <Navigate to={"/"} />}
        />
      </Routes>
      {/* <Footer /> */}
      <Toaster />
    </div>
  );
};

export default App;
