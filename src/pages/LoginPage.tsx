import { SignIn } from '@clerk/clerk-react';
import background from "../assets/bg_login.png";

const LogInPage = () => {
  return (
    <main className="grid place-items-center h-screen w-full overflow-hidden md:px-10 px-4">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
         <SignIn
          fallback={<span className="loading loading-spinner loading-xl"></span>}
          signUpUrl='/signup'
          forceRedirectUrl="/"/>
    </main>
  );
};

export default LogInPage;
