import axios from "axios";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";
import { getClerk } from "../lib/clerk"; 

//const baseUrl = "https://api.yapchat.xyz";
const baseUrl = "http://localhost:8080";

let store: Store<RootState>;

export const injectStore = (newStore: Store<RootState>) => {
  store = newStore;
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
   async(config) => {
    const clerk = await getClerk();
    const token = await clerk.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
        const clerk = await getClerk();
       await clerk.signOut();
       store.dispatch(logout());

      return Promise.reject(error.response.data);
    }

    // Reject the error with the response data for other cases
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
