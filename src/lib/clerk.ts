import { Clerk } from '@clerk/clerk-js';

const clerkPubKey = "pk_test_cHJpbWFyeS1pZ3VhbmEtNzguY2xlcmsuYWNjb3VudHMuZGV2JA";

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
