import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import chatApis from "../api/chatApis";
import { UserData } from "../types/userData";
import { toast } from "sonner";
import defaultAvatar from "../assets/avatar.png";
import { User } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await chatApis.getPublicUserProfile(
          username as string
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching user profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [username]);

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg block mx-auto"></span>
        ) : (
          <div className="bg-off-white/50 full-shadow rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold ">Yapper Profile</h1>
            </div>

            {/* avatar upload section */}

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={user?.image_url || defaultAvatar}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Name
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user?.username}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-off-white/70 rounded-xl p-6">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{user?.created_at?.toISOString().split("T")[0] ?? "2025"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  {user?.is_online ? (<span className="text-green-500">Online</span>) : (<span className="text-red-500">Offline</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
