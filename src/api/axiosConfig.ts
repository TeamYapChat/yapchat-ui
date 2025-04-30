import axios from "axios";
import { getClerk } from "../lib/clerk";

const baseUrl = "https://api.yapchat.xyz";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const clerk = await getClerk();
    const token = await clerk.session?.getToken();

    //await new Promise((resolve) => setTimeout(resolve, 2000));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log(
        "Request Interceptor: No token found, Authorization header not added"
      );
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
    if (error.response) {
      console.error(
        "Response Interceptor: Error Response Data",
        error.response.data
      );
      console.error(
        "Response Interceptor: Error Response Status",
        error.response.status
      );
      console.error(
        "Response Interceptor: Error Response Headers",
        error.response.headers
      );
    } else if (error.request) {
      console.error("Response Interceptor: Error Request Data", error.request);
    } else {
      console.error("Response Interceptor: Error Message", error.message);
    }

    if (error.response?.status === 401) {
      console.log("Response Interceptor: Handling 401 Unauthorized");

      return Promise.reject(error.response.data);
    }

    // Reject the error with the response data for other cases
    return Promise.reject(error.response?.data || error.message || error); // Ensure something is rejected
  }
);

export default axiosInstance;
