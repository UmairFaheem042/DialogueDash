import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { users, getUsers, selectedUser, isUsersLoading, setSelectedUser } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="bg-white m-2 rounded-lg border-r border-gray-200  w-[300px] h-[86vh] overflow-y-auto">
      {users.map((item) => (
        <div
          key={item._id}
          className={`flex items-center gap-4 cursor-pointer ${
            selectedUser?._id === item._id && "bg-gray-50"
          } px-6 py-4`}
          onClick={(e) => setSelectedUser(item)}
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
  );
};

export default Sidebar;
