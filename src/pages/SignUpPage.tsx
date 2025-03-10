import { useDispatch } from "react-redux";
import { fetchAsyncRegisterUsers } from "../features/auth/authSlice";
import { RegisterDataType } from "../types/authType";
import { AppDispatch } from "../features/store";
import background from "../assets/bg_login.png";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFetching = useSelector((state: RootState) => state.auth.isLoading);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnclick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: RegisterDataType = {
      email: email,
      username: username,
      password: password,
    };
    const resultAction = await dispatch(fetchAsyncRegisterUsers(data));

    if (fetchAsyncRegisterUsers.rejected.match(resultAction)) {
      toast.error(resultAction.error.message);
    } else {
      toast.success("Register success");
    }
  };

  return (
    <main className="grid place-items-center h-screen w-full overflow-hidden md:px-10 px-4">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
      {/* Login Form Section */}
      <section className="h-screen w-full flex flex-col justify-center items-center">
        <form
          className="relative flex flex-col gap-4 items-start justify-center max-w-md w-full md:rounded-3xl rounded-xl backdrop-blur-2xl full-shadow
                       md:py-10 md:px-10 p-6
                       animate-fade-in"
        >
          {/* Title */}
          <h1 className="md:text-3xl text-2xl font-semibold self-center">
            Sign up
          </h1>
          <TypeAnimation
            sequence={[
              "Welcome to YapChat, Yapper!",
              1000,
              "Start your journey now",
              1000,
            ]}
            wrapper="span"
            className="text-gray-500 self-center md:text-lg md:mb-10 mb-4"
            speed={70}
            repeat={0}
          />

          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow text-sm md:text-lg"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow text-sm md:text-lg"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow text-sm md:text-lg"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Using flex to avoid resizing height caused by Daisy loading */}
          <button
            className="flex items-center justify-center bg-black text-white p-4 rounded-2xl w-full md:mt-8 my-4"
            onClick={handleOnclick}
            disabled={isFetching}
          >
            {isFetching ? (
              <span className="loading loading-dots loading-md p-0"></span>
            ) : (
              "Sign up"
            )}
          </button>

          <div className="flex justify-between w-full text-sm">
            <Link
              to="/login"
              className="text-gray-500 hover:text-black transition"
            >
              Already have an account
            </Link>
            <Link to="/" className="text-gray-500 hover:text-black transition">
              Forgot Password?
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
