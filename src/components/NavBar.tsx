import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav
      className="flex justify-between items-center
                    h-16 w-full p-4 
                    bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-70 text-white"
    >
      <div>Yap Chat</div>

      <div>{user ? user.email : "Not logged in"}</div>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
