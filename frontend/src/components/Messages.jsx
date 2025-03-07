import React from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatContainer from "./ChatContainer";
import NoChatSelected from "./NoChatSelected";

const Messages = () => {
  const { selectedUser, isMessagesLoading } = useChatStore();

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto p-2">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <main className="flex-1 p-2 flex flex-col">
      {selectedUser && (
        <div className="flex flex-col gap-2 h-[86vh] ">
          <ChatHeader />
          <ChatContainer />
        </div>
      )}
      {!selectedUser && <NoChatSelected />}
    </main>
  );
};

export default Messages;
