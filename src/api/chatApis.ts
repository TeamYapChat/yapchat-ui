import {
  ChatRoomGetResponseType,
  ChatRoomCreateResponseType,
  ChatRoomCreateType,
  MessageGetResponseType,
  ChatRoomLeaveResponseType,
  ChatRoomInviteCodeResponseType,
  ChatRoomGetByIdResponseType,
  ChatRoomJoinResponseType,
} from "../types/chatType";
import { UserDataResponse } from "../types/userData";
import axiosInstance from "./axiosConfig";

const chatApis = {
  getAllChatRooms: async () => {
    const response = await axiosInstance.get<ChatRoomGetResponseType>(
      "/v1/chatrooms"
    );
    return response.data;
  },
  createChatRoom: async (data: ChatRoomCreateType) => {
    const response = await axiosInstance.post<ChatRoomCreateResponseType>(
      "/v1/chatrooms",
      data
    );
    return response.data;
  },
  uploadImage: async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yap_chat"); // Replace with your actual preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwirgqlon/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  },
  searchUser: async (username: string) => {
    const response = await axiosInstance.get<UserDataResponse>(
      `/v1/users/${username}`
    );
    return response.data;
  },
  getMessagesByChatRoomId: async (
    chatRoomId: number,
    page: number = 1,
    pageSize: number = 25
  ) => {
    const response = await axiosInstance.get<MessageGetResponseType>(
      `/v1/chatrooms/${chatRoomId}/messages?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  },
  leaveChatRoom: async (chatRoomId: number) => {
    const response = await axiosInstance.post<ChatRoomLeaveResponseType>(
      `v1/chatrooms/${chatRoomId}/leave`
    );
    return response.data;
  },
  getInviteCode: async (chatRoomId: number) => {
    const response = await axiosInstance.get<ChatRoomInviteCodeResponseType>(
      `/v1/chatrooms/${chatRoomId}/invite-code`
    );
    return response.data;
  },
  getChatRoomById: async (chatRoomId: number, inviteCode: string) => {
    const response = await axiosInstance.get<ChatRoomGetByIdResponseType>(
      `/v1/chatrooms/${chatRoomId}?code=${inviteCode}`
    );
    return response.data;
  },
  acceptInvite: async (chatRoomId: number, inviteCode: string) => {
    const response = await axiosInstance.post<ChatRoomJoinResponseType>(
      `/v1/chatrooms/${chatRoomId}/join?code=${inviteCode}`
    );
    return response.data;
  },
  getPublicUserProfile: async (username: string) => {
    const response = await axiosInstance.get<UserDataResponse>(
      `/v1/users/${username}`
    );
    console.log("response", response.data);
    return response.data;
  },
};

export default chatApis;
