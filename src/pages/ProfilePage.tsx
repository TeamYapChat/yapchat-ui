import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Camera } from "lucide-react";
import defaultAvatar from "../assets/avatar.png";
import { useState } from "react";
import { User, Mail } from "lucide-react";
import { UserData } from "../types/userData";

const ProfilePage = () => {

  const {isUploadingProfile} = useSelector((state: RootState) => state.auth);
  const [selectedImg, setSelectedImg] = useState<string|null>(null);

  const user : UserData = {
    id: 1,
    fullname: "John Doe",
    email: "abc123@my.utsa.edu",
    avatar: "",
  }

  const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
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
    <main className="overflow-hidden h-full">
      {/* Larger Blur */}
      <div className="absolute left-20 top-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                    blur-3xl rounded-full opacity-50"></div>
      
      {/* Smaller Blur*/}
      <div className="absolute right-40 top-1/6 w-60 h-60 bg-gradient-to-r from-blue-400 to-pink-500 
                    blur-2xl rounded-full opacity-50"></div>

      <div className="pt-20 bg-off-white h-full">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="relative full-shadow rounded-xl p-6 space-y-8 backdrop-blur-xl">
        
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">You profile information</p>
            </div>

            {/* Avatar Uploader */}

            <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={ selectedImg || user?.avatar || defaultAvatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-primary-hot-pink/60 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-secondary-peach-pink hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUploadingProfile ? "animate-pulse pointer-events-none" : ""}
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
              {isUploadingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.fullname}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.email}</p>
            </div>
          </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
