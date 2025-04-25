import {
  ChatRoomCreateResponseType,
  ChatRoomCreateType,
  ChatRoomGetResponseType,
  ChatRoomType,
  MessageType,
  MessageGetResponseType,
} from "../../types/chatType";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import chatApis from "../../api/chatApis";

interface ChatState {
  chatRooms: ChatRoomType[];
  onlineUsers: string[];
  isLoading: boolean;
  error: string | null;
  selectedChatRoom: ChatRoomType | null;
  isMessagesLoading: boolean;
  isMoreMessagesLoading: boolean;
  messages: MessageType[];
  isUploadingProfile: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
}

const initialState: ChatState = {
  onlineUsers: [],
  chatRooms: [],
  isLoading: false,
  error: null,
  selectedChatRoom: null,
  isMessagesLoading: true,
  messages: [],
  isUploadingProfile: false,
  page: 0,
  pageSize: 25,
  totalPages: 0,
  totalRows: 0,
  isMoreMessagesLoading: false,
};

export const fetchAsyncGetChatRooms = createAsyncThunk<ChatRoomGetResponseType>(
  "chat/getChatRooms",
  async () => {
    const response = await chatApis.getAllChatRooms();
    return response;
  }
);

export const fetchAsyncCreateChatRoom = createAsyncThunk<
  ChatRoomCreateResponseType,
  ChatRoomCreateType
>("chat/createChatRoom", async (data) => {
  const response = await chatApis.createChatRoom(data);
  return response;
});

export const fetchAsyncGetMessagesByChatRoomId = createAsyncThunk<
  MessageGetResponseType,
  { chatRoomId: number; page: number }
>(
  "chat/getMessagesByChatRoomId",
  async ({ chatRoomId, page }) => {
    const response = await chatApis.getMessagesByChatRoomId(chatRoomId, page, 25);
    return response;
  }
);

export const fetchAsyncLeaveChatRoom = createAsyncThunk<
    ChatRoomCreateResponseType,
    number
>("chat/leaveChatRoom", async (chatRoomId) => {
  const response = await chatApis.leaveChatRoom(chatRoomId);
    return response;
});

export const fetchAsyncUploadImage = createAsyncThunk<string, File>(
  "chat/uploadImage",
  async (image) => {
    const response = await chatApis.uploadImage(image);
    return response;
  }
); 

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatRooms: (state) => {
      state.chatRooms = [];
    },
    setSelectedChatRoom: (
      state,
      action: PayloadAction<ChatRoomType | null>
    ) => {
      state.selectedChatRoom = action.payload;
      state.messages = [];
      state.page = 0;
      state.pageSize = 25;
      state.totalPages = 0;
    },
    receiveNewMessage: (state, action: PayloadAction<MessageType>) => {
      if (state.selectedChatRoom && state.selectedChatRoom.id === action.payload.room_id) {
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // Get chat rooms
    builder.addCase(fetchAsyncGetChatRooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAsyncGetChatRooms.fulfilled,
      (state, action: PayloadAction<ChatRoomGetResponseType>) => {
        state.isLoading = false;
        state.error = null;
        if ("data" in action.payload && action.payload.data) {
          state.chatRooms = action.payload.data;
          for (const room of action.payload.data) {
            for (const user of room.participants) {
              if (
                !state.onlineUsers.includes(user.id) &&
                user.is_online == true
              ) {
                state.onlineUsers.push(user.id);
              }
            }
          }
        }
      }
    );
    builder.addCase(fetchAsyncGetChatRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch chat rooms";
    });
    // Create chat room
    builder.addCase(fetchAsyncCreateChatRoom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAsyncCreateChatRoom.fulfilled,
      (state, action: PayloadAction<ChatRoomCreateResponseType>) => {
        state.isLoading = false;
        state.error = null;
        console.log("Chat room created successfully:", action.payload);
      }
    );
    builder.addCase(fetchAsyncCreateChatRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to create chat room";
    });
    // Get messages by chat room id
    builder.addCase(fetchAsyncGetMessagesByChatRoomId.pending, (state) => {
      if (state.page ===0){
        state.isMessagesLoading = true;
      }
      else{
        state.isMoreMessagesLoading = true;
      }
    });
    builder.addCase(
      fetchAsyncGetMessagesByChatRoomId.fulfilled,
      (state, action: PayloadAction<MessageGetResponseType>) => {
        state.isMessagesLoading = false;
        state.isMoreMessagesLoading = false;
        state.error = null;
    
        console.log("Messages fetched successfully:", action.payload);
    
        if ("data" in action.payload && action.payload.data) {
          const fetchedMessages = action.payload.data.sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          });
    
          // Merge the old messages with the new ones, sort them again.
          state.messages = [
            ...state.messages,
            ...fetchedMessages
          ].sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          });
    
          state.page = action.payload.page;
          state.pageSize = action.payload.page_size;
          state.totalPages = action.payload.total_pages;
          state.totalRows = action.payload.total_rows;
        }
      }
    );
    builder.addCase(
      fetchAsyncGetMessagesByChatRoomId.rejected,
      (state, action) => {
        state.isMessagesLoading = false;
        state.isMoreMessagesLoading = false;
        state.error = action.error.message || "Failed to fetch messages";
      }
    );
    // Leave chat room
    builder.addCase(fetchAsyncLeaveChatRoom.pending, (state) => {
        state.isLoading = true;
        });
    builder.addCase(
        fetchAsyncLeaveChatRoom.fulfilled,
        (state) => {
          state.isLoading = false;
          state.error = null;
          state.chatRooms = state.chatRooms.filter(
            (room) => room.id !== state.selectedChatRoom?.id
          );
          state.selectedChatRoom = null;
        }
      );
    builder.addCase(fetchAsyncLeaveChatRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to leave chat room";
      }
    );
    // Upload image
    builder.addCase(fetchAsyncUploadImage.pending, (state) => {
      state.isUploadingProfile = true;
    });
    builder.addCase(
      fetchAsyncUploadImage.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.isUploadingProfile = false;
        state.error = null;
        console.log("Image uploaded successfully:", action.payload);
      }
    );
    builder.addCase(fetchAsyncUploadImage.rejected, (state, action) => {
      state.isUploadingProfile = false;
      state.error = action.error.message || "Failed to upload image";
    }
    );
  },
});

export default chatSlice.reducer;
export const { clearChatRooms, setSelectedChatRoom, receiveNewMessage } =
  chatSlice.actions; // Selector to get chat rooms from state
