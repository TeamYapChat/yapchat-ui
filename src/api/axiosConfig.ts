import axios from "axios";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";

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
  (config) => {
    const token = store.getState().auth.token;
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

    console.error("Error response", error.response);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      store.dispatch(logout());
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
