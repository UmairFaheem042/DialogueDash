import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const { signIn } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(userData);
  };

  return (
    <div className="max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] grid grid-cols-2">
      <section className="w-screen md:w-auto flex gap-4 flex-col items-center justify-center border-r border-gray-200">
        <h1 className="text-2xl font-thin">
          Welcome back to <span className="font-semibold">DialogDash</span>
        </h1>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-[80%]">
          <div>
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                name="email"
                type="email"
                placeholder="mail@site.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </label>
          </div>

          <div>
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                name="password"
                type="password"
                placeholder="Password"
                minLength="3"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="font-semibold">
            Create an account
          </Link>
        </p>
      </section>

      <section className="hidden md:block bg-emerald-300 p-6">
        <div className="chat chat-start">
          <div className="chat-bubble">
            It's over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
