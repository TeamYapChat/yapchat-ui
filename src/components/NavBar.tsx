import { SignOutButton, useAuth } from "@clerk/clerk-react";

const NavBar = () => {
  const user = useAuth();

  return (
    <nav
      className="flex justify-between items-center
                    h-16 w-full p-4 
                    bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-70 text-white"
    >
      <div>YapChat</div>
      <div>{"User ID: " + user.userId}</div>
      <SignOutButton redirectUrl="/sign-in" />;
    </nav>
  );
};

export default NavBar;
