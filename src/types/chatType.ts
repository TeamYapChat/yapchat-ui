import { ErrorResponse } from "./authType";

interface ChatRoomType {
    id: number;
    name: string;
    participant_ids: number[];
    type: string;
}

interface ChatRoomCreateType{
    name: string;
    participant_ids: number[];
    type: string;
}

interface ChatRoomSuccessResponseType <T> {
    data: T;
    message: string;
    success: true;
}

type ChatRoomGetResponseType<T = ChatRoomType[]> = ChatRoomSuccessResponseType <T> | ErrorResponse;
type ChatRoomCreateResponseType<T = string> = ChatRoomSuccessResponseType <T> | ErrorResponse;

export type { ChatRoomType, ChatRoomGetResponseType, ChatRoomCreateResponseType, ChatRoomCreateType };