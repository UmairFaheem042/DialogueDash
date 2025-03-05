import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/check-auth",
          { withCredentials: true }
        );
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign-up",
        {
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          profilePic: userData.profilePic,
        },
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate("/chats");
    } catch (error) {
      console.log("FRONTEND:- signUp ", error.message);
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        {
          email: userData.email,
          password: userData.password,
        },
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate("/chats");
    } catch (error) {
      console.log("FRONTEND:- signIn ", error.message);
    }
  };

  const signOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign-out",
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log("FRONTEND:- signOut ", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
