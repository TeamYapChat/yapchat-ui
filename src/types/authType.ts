interface LoginDataType {
    userName: string;
    passWord: string;
}
interface RegisterDataType {
    email: string;
    password: string;
    confirmPassword: string;
}
interface AuthResponse {
    result: boolean;
    errorMessage: string;
    dataResult?: {
        accessToken: string;
        refreshToken: string;
    };
}

export type { LoginDataType, RegisterDataType, AuthResponse };