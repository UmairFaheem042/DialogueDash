import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/chatContext";

const Profile = () => {
  const { user } = useAuth();
  const { getUsers, allUsers } = useChat();

  useEffect(() => {
    getUsers();
  }, []);

  console.log(allUsers);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-4 min-h-[calc(100vh-80px)] flex flex-col gap-0 items-center justify-center">
      <img
        src={user?.profilePic}
        alt="profile pic"
        className="w-[400px] h-[400px] rounded-full object-cover"
      />
      <h1 className="text-4xl mt-4">{user?.fullName}</h1>
      <h1 className="text-sm">{user?.email}</h1>

      <button className="btn btn-error mt-10">Delete Account</button>
    </div>
  );
};

export default Profile;
