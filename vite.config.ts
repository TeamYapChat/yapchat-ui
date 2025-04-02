import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import runtimeEnv from "vite-plugin-runtime-env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), runtimeEnv()],
  server: {
    hmr: false,
},
});
