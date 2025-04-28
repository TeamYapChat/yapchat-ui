import axios from "axios";
// import { Store } from "@reduxjs/toolkit";
// import { RootState } from "../features/store";
//import { logout } from "../features/auth/authSlice";
import { getClerk } from "../lib/clerk"; 

const baseUrl = "https://api.yapchat.xyz";
//const baseUrl = "http://localhost:8080";

//let store: Store<RootState>;

// export const injectStore = (newStore: Store<RootState>) => {
//   store = newStore;
// };

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
   async(config) => {
    console.log("Request Interceptor: Config before modification", config);
    const clerk = await getClerk();
    const token = await clerk.session?.getToken();
    console.log("Request Interceptor: Fetched token", token ? `Token length: ${token.length}` : "No token");
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Request Interceptor: Added Authorization header");
    } else {
      console.log("Request Interceptor: No token found, Authorization header not added");
    }
    console.log("Request Interceptor: Config after modification", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor: Error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor: Success", response);
    return response;
  },
  async (error) => {
    console.error("Response Interceptor: Error", error);
    if (error.response) {
        console.error("Response Interceptor: Error Response Data", error.response.data);
        console.error("Response Interceptor: Error Response Status", error.response.status);
        console.error("Response Interceptor: Error Response Headers", error.response.headers);
    } else if (error.request) {
        console.error("Response Interceptor: Error Request Data", error.request);
    } else {
        console.error('Response Interceptor: Error Message', error.message);
    }

    if (error.response?.status === 401) {
      console.log("Response Interceptor: Handling 401 Unauthorized");
      //   const clerk = await getClerk();
      //  await clerk.signOut();
      //  store.dispatch(logout());

      return Promise.reject(error.response.data);
    }

    // Reject the error with the response data for other cases
    console.log("Response Interceptor: Rejecting with error response data");
    return Promise.reject(error.response?.data || error.message || error); // Ensure something is rejected
  }
);

export default axiosInstance;
