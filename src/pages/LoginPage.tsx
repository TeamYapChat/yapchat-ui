import { SignIn } from "@clerk/clerk-react";
import background from "../assets/chat_bg.jpg";
import { useLocation } from "react-router-dom";

const LogInPage = () => {
  const location = useLocation();
  const redirectUrl =
    new URLSearchParams(location.search).get("redirect") || "/";

  return (
    <main className="grid place-items-center h-screen w-full overflow-hidden md:px-10 px-4">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
      <div className="animate-fade-in">
        <SignIn
          fallback={
            <span className="loading loading-spinner loading-xl"></span>
          }
          signUpUrl="/signup"
          forceRedirectUrl={redirectUrl.substring(1)}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-off-white/30 hover:scale-105 hover:bg-transparent duration-200 text-black font-bold border-none outline-none shadow-none",
              card: " rounded-2xl backdrop-blur-sm bg-white/10",
              socialButtonsBlockButton: "bg-off-white/30 text-black font-bold",
              formFieldInput: "bg-off-white/80 text-black ",
              footer: "bg-none text-black font-bold",
              logoBox: "hidden",
            },
          }}
        />
      </div>
    </main>
  );
};

export default LogInPage;
