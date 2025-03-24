interface UserData {
  id: number;
  email: string;
  image_url: string;
  username: string;
  created_at: Date;
  is_online: boolean;
}

interface UserDataResponse<T = UserData> {
  data: T;
  message: string;
  success: true;
}

export type { UserData, UserDataResponse };
