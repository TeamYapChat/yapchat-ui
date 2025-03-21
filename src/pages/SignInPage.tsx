import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-300 to-pink-300">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        signUpFallbackRedirectUrl="/"
        forceRedirectUrl="/"
        appearance={{
          variables: {
            colorPrimary: "#4fd1c5", // Teal
            colorBackground: "#ffffff", // White background
            colorText: "#2d3748", // Dark gray text
            colorTextSecondary: "#718096", // Lighter gray text
            colorInputBackground: "#f7fafc", // Light gray inputs
          },
        }}
      />
    </div>
  );
}
