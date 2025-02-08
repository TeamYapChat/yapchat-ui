import axiosInstance from "./axiosConfig";
import { AuthResponse, LoginDataType } from "../types/authType";

const authApis = {
    login: async(data: LoginDataType) => {
        const response = await axiosInstance.post('/api/auth/login', data) as AuthResponse;
        return response;
    }
}

export default authApis;