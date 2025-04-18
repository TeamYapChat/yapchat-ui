import { ErrorResponseType, SuccessResponseType } from "./apiResponseType";
import { UserData } from "./userData";

interface ChatRoomType {
    id: number;
    name: string;
    participants: UserData[];
    type: string;
    image_url: string | null;
}

interface ChatRoomCreateType{
    name: string;
    participant_ids: string[];
    type: string;
    image_url: string | null;
}

interface MessageType {
    content: string;
    sender_id: string;
    timestamp: Date;
}


type ChatRoomGetResponseType<T = ChatRoomType[]> = SuccessResponseType <T> | ErrorResponseType;
type ChatRoomGetByIdResponseType<T = ChatRoomType> = SuccessResponseType <T> | ErrorResponseType;
type ChatRoomCreateResponseType<T = string> = SuccessResponseType <T> | ErrorResponseType;
type MessageGetResponseType<T = MessageType[]> = SuccessResponseType <T> | ErrorResponseType;
type ChatRoomLeaveResponseType<T = string> = SuccessResponseType <T> | ErrorResponseType;
type ChatRoomInviteCodeResponseType<T = string> = SuccessResponseType<T> | ErrorResponseType;
type ChatRoomJoinResponseType<T = string> = SuccessResponseType<T> | ErrorResponseType;

export type { ChatRoomType, ChatRoomGetResponseType, ChatRoomCreateResponseType, ChatRoomCreateType, MessageType, MessageGetResponseType, ChatRoomLeaveResponseType, ChatRoomInviteCodeResponseType, ChatRoomGetByIdResponseType, ChatRoomJoinResponseType };