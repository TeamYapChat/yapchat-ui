import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store.ts";
import { ClerkProvider } from "@clerk/clerk-react";

import { injectStore } from "./api/axiosConfig.js";

async function loadConfig() {
  const res = await fetch("/config.json");
  const config = await res.json();

  return String(config.CLERK_PUBLISHABLE_KEY);
}

injectStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ClerkProvider publishableKey={await loadConfig()}>
          <App />
        </ClerkProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
