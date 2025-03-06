import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/complete-logo.png";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser, signOut } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log("signing out");
    await signOut(navigate);
  };

  // console.log();

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
              {location.pathname.startsWith("/profile") ? (
                <>
                  <Link to={`/chats`} className="cursor-pointer">
                    <button className="btn btn-soft btn-secondary">
                      View Chats
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/${authUser?.user?._id}`}
                    className="cursor-pointer"
                  >
                    <button className="btn btn-soft btn-secondary">
                      View Profile
                    </button>
                  </Link>
                </>
              )}

              <button onClick={handleSignOut} className="btn btn-primary">
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
