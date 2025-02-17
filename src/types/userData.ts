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
}

export type { UserCredentialsData, UserData };