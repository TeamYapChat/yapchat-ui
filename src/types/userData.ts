interface UserCredentialsData {
  email: string;
  id: number;
  username: string;
}

interface UserData {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { UserCredentialsData, UserData };
