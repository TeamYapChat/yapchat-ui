import { UserData } from "./userData";

interface LoginDataType {
    email: string;
    password: string;
}
interface RegisterDataType {
    email: string;
    password: string;
    username: string;
}
interface SuccessResponse<T = string> {
    data: T;
    message: string;
    success: true;
}  
interface ErrorResponse {
    message: string;
    success: false;
}

type AuthResponse<T = string> = SuccessResponse<T> | ErrorResponse;
type RegisterResponse<T = UserData> = SuccessResponse<T>| ErrorResponse;

export type { LoginDataType, RegisterDataType, AuthResponse, RegisterResponse };