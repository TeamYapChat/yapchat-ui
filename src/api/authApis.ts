import axiosInstance from "./axiosConfig";
import { UserDataResponse } from "../types/userData";

const authApis = {
  getUser: async () =>{
    const response = await axiosInstance.get<UserDataResponse>("v1/user");
    return response.data;
  },
};

export default authApis;
