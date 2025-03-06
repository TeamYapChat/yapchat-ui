import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Camera } from "lucide-react";
import defaultAvatar from "../assets/avatar.png";
import { useState } from "react";
import { User, Mail } from "lucide-react";
import { UserData } from "../types/userData";

const ProfilePage = () => {
  const { isUploadingProfile } = useSelector((state: RootState) => state.auth);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const user: UserData = {
    id: 1,
    fullname: "John Doe",
    email: "abc123@my.utsa.edu",
    avatar: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      // await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <main className="h-full">
      {/* Larger Blur */}
      <div
        className="fixed left-20 top-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                    blur-3xl rounded-full opacity-50"
      ></div>

      {/* Smaller Blur*/}
      <div
        className="fixed right-40 top-1/5 w-60 h-60 bg-gradient-to-r from-blue-400 to-pink-500 
                    blur-2xl rounded-full opacity-50"
      ></div>

      <div className=" bg-off-white h-full flex justify-center items-center">
        <div className="max-w-2xl mx-auto p-4 py-8 w-full">
          <div className="relative full-shadow rounded-xl p-6 space-y-8 backdrop-blur-xl my-10">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">You profile information</p>
            </div>

            {/* Avatar Uploader */}

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || user?.avatar || defaultAvatar}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-primary-hot-pink/60"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-secondary-peach-pink hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUploadingProfile
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }
                `}
                >
                  <Camera className="w-5 h-5 text-dark-text" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUploadingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-secondary-lavender/20 rounded-lg border">
                  {user?.fullname}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-secondary-lavender/20 rounded-lg border">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-secondary-lavender/20 rounded-xl p-6">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>
                    {user.createdAt
                      ? new Date(user.createdAt).toISOString().split("T")[0]
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
