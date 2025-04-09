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
  messages: MessageType[];
}

const initialState: ChatState = {
  onlineUsers: [],
  chatRooms: [],
  isLoading: false,
  error: null,
  selectedChatRoom: null,
  isMessagesLoading: true,
  messages: [],
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
  number
>("chat/getMessagesByChatRoomId", async (chatRoomId) => {
  const response = await chatApis.getMessagesByChatRoomId(chatRoomId);
  return response;
});

export const fetchAsyncLeaveChatRoom = createAsyncThunk<
    ChatRoomCreateResponseType,
    number
>("chat/leaveChatRoom", async (chatRoomId) => {
  const response = await chatApis.leaveChatRoom(chatRoomId);
    return response;
});


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
    },
    receiveNewMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
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
      state.isMessagesLoading = true;
    });
    builder.addCase(
      fetchAsyncGetMessagesByChatRoomId.fulfilled,
      (state, action: PayloadAction<MessageGetResponseType>) => {
        state.isMessagesLoading = false;
        state.error = null;
        if ("data" in action.payload && action.payload.data) {
          state.messages = action.payload.data.sort((a, b) => {
            return (
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
          });
        }
      }
    );
    builder.addCase(
      fetchAsyncGetMessagesByChatRoomId.rejected,
      (state, action) => {
        state.isMessagesLoading = false;
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
  },
});

export default chatSlice.reducer;
export const { clearChatRooms, setSelectedChatRoom, receiveNewMessage } =
  chatSlice.actions; // Selector to get chat rooms from state
