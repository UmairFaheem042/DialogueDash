import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";

const Chats = () => {
  const { getUsers, getMessages, selectedUser, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser?._id, getMessages]);

  return (
    <div className="max-w-[1600px] mx-auto  min-h-[calc(100vh-80px)] flex">
      <Sidebar />
      <main className="flex-1 p-2">
        {selectedUser && (
          <div className="flex flex-col gap-2 h-[86vh]">
            <div className="flex items-center justify-between bg-white rounded-lg p-2">
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.profilePic}
                  alt="pfp"
                  className="size-10 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold">
                    {selectedUser.fullName}
                  </h1>
                  <h1 className="text-sm">Online</h1>
                </div>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => setSelectedUser(null)}
              >
                ❌
              </button>
            </div>
            <div className="bg-white rounded-lg p-2 flex-1">Chat Here</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chats;
