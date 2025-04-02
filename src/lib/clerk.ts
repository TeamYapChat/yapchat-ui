import { Clerk } from '@clerk/clerk-js';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

let clerkInstance: Clerk | null = null;
let clerkLoaded = false;

export const getClerk = async () => {
  if (!clerkInstance) {
    clerkInstance = new Clerk(clerkPubKey);
  }

  if (!clerkLoaded) {
    await clerkInstance.load();
    clerkLoaded = false;
  }

  return clerkInstance;
};
