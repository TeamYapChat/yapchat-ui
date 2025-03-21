import { SignIn, SignUp } from "@clerk/clerk-react";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
      <SignUp />
    </div>
  );
}
