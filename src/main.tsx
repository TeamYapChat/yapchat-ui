import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store.ts";
import { ClerkProvider } from "@clerk/clerk-react";

async function initApp() {
  //const res = await fetch("/config.json");
  //const config = await res.json();

  // Force lightmode
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");

  const PUBLISHABLE_KEY =
    window.__RUNTIME_CONFIG__?.CLERK_PUBLISHABLE_KEY || "default-key";
  console.log("PUBLISHABLE_KEY: ", PUBLISHABLE_KEY);

  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <ClerkProvider
          // TODO: Dynamically read Clerk publishable key
          publishableKey={
            "pk_test_cHJpbWFyeS1pZ3VhbmEtNzguY2xlcmsuYWNjb3VudHMuZGV2JA"
          }
        >
          <App />
        </ClerkProvider>
      </Provider>
    </BrowserRouter>
  );
}

initApp();
