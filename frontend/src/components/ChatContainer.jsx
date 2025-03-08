import React, { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const { messages, getMessages, selectedUser } = useChatStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // getMessages(selectedUser?._id);
    // subscribeToMessages();
    // return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  ]);

  return (
    <div className="bg-white rounded-lg p-2 flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?.user?._id
                ? "chat-end"
                : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?.user?._id
                      ? authUser?.user?.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
