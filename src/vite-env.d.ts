/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      CLERK_PUBLISHABLE_KEY?: string;
    };
  }
}
