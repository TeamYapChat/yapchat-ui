import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store.ts";
import { ClerkProvider } from '@clerk/clerk-react'

async function initApp() {
  const res = await fetch("/config.json");
  const config = await res.json();
  const PUBLISHABLE_KEY = config.CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key in clerk-config.json");
  }

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <ClerkProvider publishableKey="pk_test_cHJpbWFyeS1pZ3VhbmEtNzguY2xlcmsuYWNjb3VudHMuZGV2JA">
          <App />
        </ClerkProvider>
      </Provider>
    </BrowserRouter>
  );
}

initApp();
