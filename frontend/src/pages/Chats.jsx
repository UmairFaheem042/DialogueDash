import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";

const Chats = () => {
  const { getMessages, selectedUser } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser?._id, getMessages]);

  return (
    <div className="max-w-[1600px] mx-auto  min-h-[calc(100vh-80px)] flex">
      <Sidebar />
      <Messages />
    </div>
  );
};

export default Chats;
