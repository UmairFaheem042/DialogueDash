import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  //   const { onlineUsers } = useAuthStore();

  const onlineUsers = [];
  return (
    <>
      {selectedUser && (
        <div className="flex items-center justify-between bg-white rounded-lg p-2">
          <div className="flex items-center gap-4">
            <img
              src={selectedUser?.profilePic}
              alt="pfp"
              className="size-10 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">
                {selectedUser?.fullName}
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
      )}
    </>
  );
};
export default ChatHeader;
