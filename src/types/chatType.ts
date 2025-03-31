import { ErrorResponse } from "./authType";
import { UserData } from "./userData";

interface ChatRoomType {
    id: number;
    name: string;
    participants: UserData[];
    type: string;
}

interface ChatRoomCreateType{
    name: string;
    participant_ids: string[];
    type: string;
}

interface SuccessResponseType <T> {
    data: T;
    message: string;
    success: true;
}

interface MessageType {
    content: string;
    sender_id: string;
    timestamp: Date;
}

type ChatRoomGetResponseType<T = ChatRoomType[]> = SuccessResponseType <T> | ErrorResponse;
type ChatRoomCreateResponseType<T = string> = SuccessResponseType <T> | ErrorResponse;
type MessageGetResponseType<T = MessageType[]> = SuccessResponseType <T> | ErrorResponse;

export type { ChatRoomType, ChatRoomGetResponseType, ChatRoomCreateResponseType, ChatRoomCreateType, MessageType, MessageGetResponseType };