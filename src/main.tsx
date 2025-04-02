import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store.ts";
import { ClerkProvider } from "@clerk/clerk-react";

// import { injectStore } from "./api/axiosConfig.js";

// Import your Publishable Key
//const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

console.log("window type:", typeof window);
console.log("Runtime Config:", window.__RUNTIME_CONFIG__);
console.log("Clerk Key:", window.__RUNTIME_CONFIG__?.CLERK_PUBLISHABLE_KEY);

const PUBLISHABLE_KEY =
  window.__RUNTIME_CONFIG__?.CLERK_PUBLISHABLE_KEY || "default-key";
console.log("PUBLISHABLE_KEY: ", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// injectStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
