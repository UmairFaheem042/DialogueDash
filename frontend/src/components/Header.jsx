import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/complete-logo.png";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser, isCheckingAuth, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("signing out");
    signOut(navigate);
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/10 border-b border-gray-300 ">
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 h-20 px-6 py-4">
        <Link to={"/"} className="text-lg font-semibold">
          <img src={logo} className="w-[200px]" alt="website logo" />
        </Link>
        <div className="flex items-center gap-2">
          {!authUser && (
            <>
              <Link to={"/sign-up"} className="btn btn-soft btn-secondary">
                Get Started
              </Link>
              <Link to={"/sign-in"} className="btn btn-primary">
                Sign In
              </Link>
            </>
          )}
          {authUser && (
            <>
              <button
                onClick={handleSignOut}
                className="btn btn-soft btn-primary"
              >
                Sign Out
              </button>
              <Link
                to={`/profile/${authUser?.user?._id}`}
                className="w-10 h-10 avatar avatar-online cursor-pointer ml-3"
              >
                <img
                  src={authUser?.user?.profilePic}
                  className="rounded-full"
                  loading="lazy"
                />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
