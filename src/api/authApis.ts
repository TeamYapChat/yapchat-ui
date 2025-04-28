import axiosInstance from "./axiosConfig";
import { UserDataResponse } from "../types/userData";

const authApis = {
  getUser: async () => {
    const response = await axiosInstance.get<UserDataResponse>("v1/users/me");
    return response.data;
  },
};

export default authApis;
