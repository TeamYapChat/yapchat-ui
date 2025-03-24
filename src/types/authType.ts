interface LoginDataType {
  login: string;
  password: string;
}
interface RegisterDataType {
  email: string;
  password: string;
  username: string;
}
interface ErrorResponse {
  message: string;
  success: false;
}


export type { LoginDataType, RegisterDataType, ErrorResponse };
