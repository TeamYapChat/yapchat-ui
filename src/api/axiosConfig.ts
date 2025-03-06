import axios from "axios";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";

const baseUrl = "https://api.yapchat.xyz";

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
  (config) => {
    const token = localStorage.getItem("token");
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
  (error) => {
    if (error.response.status === 401) {
      // Clear token and Authenticated State
      store.dispatch(logout());
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
