import React, { useEffect } from "react";
import { useChat } from "../context/chatContext";

const Chats = () => {
  const { allUsers, getUsers } = useChat();
  useEffect(() => {
    getUsers();
  }, []);
  console.log(allUsers);

  return (
    <div className="max-w-[1600px] mx-auto  min-h-[calc(100vh-80px)] flex">
      <aside className="border-r border-gray-200  w-[300px]">
        {allUsers?.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-white px-6 py-4"
          >
            <img
              src={item.profilePic}
              alt="pfg"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h1 className="font-medium line-clamp-1">{item.fullName}</h1>
              <h4 className="text-sm font-thin line-clamp-1">{item.email}</h4>
            </div>
          </div>
        ))}
      </aside>
      <main className="flex-1 bg-emerald-200 px-6 py-4">Chat Preview</main>
    </div>
  );
};

export default Chats;
