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

  // console.log("window type:", typeof window);
  // console.log("Runtime Config:", window.__RUNTIME_CONFIG__);
  // console.log("Clerk Key:", window.__RUNTIME_CONFIG__?.CLERK_PUBLISHABLE_KEY);

  // Force lightmode
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");

  const PUBLISHABLE_KEY =
    window.__RUNTIME_CONFIG__?.CLERK_PUBLISHABLE_KEY || "default-key";
  console.log("PUBLISHABLE_KEY: ", PUBLISHABLE_KEY);

  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  // injectStore(store);

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <ClerkProvider
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
