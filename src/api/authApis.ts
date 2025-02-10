import axiosInstance from "./axiosConfig";
import { AuthResponse, LoginDataType, RegisterDataType, RegisterResponse } from "../types/authType";

const authApis = {
    login: async(data: LoginDataType) => {
        const response = await axiosInstance.post<AuthResponse>('auth/login', data);
        return response.data;
    },
    signup: async(data: RegisterDataType) => {
        const response = await axiosInstance.post<RegisterResponse>('auth/register', data);
        return response.data;
    },
}

export default authApis;