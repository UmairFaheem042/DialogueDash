import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile, deleteAccount } =
    useAuthStore();

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [fullName, setFullName] = useState(authUser?.user?.fullName);
  const [email, setEmail] = useState(authUser?.user?.email);

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
          className={`absolute top-0 btn  ${isUpdatingProfile ? "cursor-none pointer-events-none btn-soft btn-info" : "btn-soft btn-primary"}`}
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
      <h1 className="text-4xl mt-4 text-center p-2 outline-none rounded-lg">
        {fullName}
      </h1>

      <h1 className="text-sm">{email}</h1>

      <button className="btn btn-error mt-10" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
