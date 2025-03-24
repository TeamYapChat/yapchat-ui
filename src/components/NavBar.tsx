import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";
import { LogOut, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, SignOutButton } from '@clerk/clerk-react'

const NavBar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated || false
  );
  const dispatch = useDispatch();

  return (
    <header
      className="flex justify-between items-center
                    fixed w-full top-0 z-40
                    bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white"
    >
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Yap Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6">

            {isAuthenticated && (
              <>
                <SignOutButton>
                  <button className="flex gap-2 items-center" onClick={() => dispatch(logout())}>
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
