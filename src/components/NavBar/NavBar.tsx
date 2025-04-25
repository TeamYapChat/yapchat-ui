import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, SignOutButton } from '@clerk/clerk-react'
import { useClerk } from "@clerk/clerk-react";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated || false
  );
  const { signOut } = useClerk();

  return (
    <header
      className="flex justify-between items-center
                    fixed w-full top-0 z-40
                    bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-off-white"
    >
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <img src={logo} alt="logo" className="size-32"/>
            </Link>
          </div>

          <div className="flex items-center gap-6">

            {isAuthenticated && (
              <>
                <SignOutButton>
                  <button className="flex gap-2 items-center" onClick={() => signOut({ redirectUrl: '/login' })}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </SignOutButton>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default NavBar;
