import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [preview, setPreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔥 show preview locally
    setPreview(URL.createObjectURL(file));

    // 🔥 send file as multipart/form-data
    const formData = new FormData();
    formData.append("image", file);

    await updateProfile(formData);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p>Your profile information</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={preview || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />

              <label
                className={`absolute bottom-0 right-0 p-2 bg-base-content rounded-full cursor-pointer
                  ${isUpdatingProfile ? "pointer-events-none opacity-60" : ""}
                `}
              >
                <Camera className="text-base-200" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Change profile picture"}
            </p>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User size={16} /> Full Name
              </div>
              <p className="bg-base-200 p-2 rounded-lg">
                {authUser.fullName}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail size={16} /> Email
              </div>
              <p className="bg-base-200 p-2 rounded-lg">
                {authUser.email}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
