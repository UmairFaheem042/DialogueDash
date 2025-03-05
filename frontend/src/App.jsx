import React from "react";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Chats from "./pages/Chats";

const App = () => {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/chats" element={<Chats/>} />
          <Route path="/notifications" element={<>All Notifications</>} />
          <Route path="/search" element={<>All Users Search</>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
