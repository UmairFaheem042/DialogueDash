import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = false;
  return (
    <header className="border-b border-gray-300">
      <nav className="flex items-center justify-between gap-2 px-6 py-4">
        <Link to={"/"} className="text-lg font-semibold">
          DialogDash
        </Link>
        <div className="flex items-center gap-2">
          {!isLoggedIn && (
            <>
              <Link to={"/sign-up"} className="btn btn-soft btn-secondary">
                Get Started
              </Link>
              <Link to={"/sign-in"} className="btn btn-primary">Sign In</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="btn btn-soft btn-primary">Sign Out</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
