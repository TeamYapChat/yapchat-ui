import { SuccessResponseType } from "../types/apiResponseType";

interface UserData {
  id: string;
  email: string;
  image_url: string;
  username: string;
  created_at: Date;
  is_online: boolean;
}

type UserDataResponse<T = UserData> = SuccessResponseType<T>;

export type { UserData, UserDataResponse };
