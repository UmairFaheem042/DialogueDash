import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../lib/formatDate";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile, deleteAccount } =
    useAuthStore();

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [fullName, setFullName] = useState(authUser?.user?.fullName);
  const [email, setEmail] = useState(authUser?.user?.email);
  const [createdOn, setCreatedOn] = useState(authUser?.user?.createdAt);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);
      await updateProfile(formData);
    }
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(authUser?.user?._id, navigate);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-4 min-h-[calc(100vh-80px)] flex flex-col gap-0 items-center justify-center">
      <div className="relative w-full flex items-center justify-center">
        <img
          src={selectedImage || authUser?.user?.profilePic}
          alt="profile pic"
          className="w-[400px] h-[400px] rounded-full object-cover"
          loading="lazy"
        />
        <label
          htmlFor="image-upload"
          className={`absolute top-0 btn  ${
            isUpdatingProfile
              ? "cursor-none pointer-events-none btn-soft btn-info"
              : "btn-soft btn-primary"
          }`}
          onChange={handleImageUpload}
        >
          {isUpdatingProfile ? "Updating..." : "Change Profile Picture"}
        </label>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUpdatingProfile}
        />
      </div>
      <div className="mt-8 flex flex-col gap-6 w-[80%]">
        <div>
          <label>Full Name</label>
          <h1 className="text-md  border border-gray-200 rounded-lg p-2">
            {fullName}
          </h1>
        </div>
        <div>
          <label>Email Address</label>
          <h1 className="text-md border border-gray-200 rounded-lg p-2">
            {email}
          </h1>
        </div>
        <div>
          <label>Account Created On</label>
          <h1 className="text-md  border border-gray-200 rounded-lg p-2">
            {formatDateTime(createdOn)}
          </h1>
        </div>
      </div>

      <button className="btn btn-error mt-10" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
