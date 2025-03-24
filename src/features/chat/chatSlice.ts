import { ChatRoomCreateResponseType, ChatRoomCreateType, ChatRoomGetResponseType, ChatRoomType } from "../../types/chatType";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import chatApis from "../../api/chatApis";

interface ChatState {
    chatRooms: ChatRoomType[];
    onlineUsers: number[];
    isLoading: boolean;
    error: string | null;
    selectedChatRoom: ChatRoomType | null;
}

const initialState: ChatState = {
    onlineUsers: [],
    chatRooms: [],
    isLoading: false,
    error: null,
    selectedChatRoom: null,
};

export const fetchAsyncGetChatRooms = createAsyncThunk<
    ChatRoomGetResponseType>(
        "chat/getChatRooms", async () => {
            const response = await chatApis.getAllChatRooms();
            return response;
        }
);

export const fetchAsyncCreateChatRoom = createAsyncThunk<
    ChatRoomCreateResponseType,
    ChatRoomCreateType>(
        "chat/createChatRoom", async (data) => {
            const response = await chatApis.createChatRoom(data);
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
        setSelectedChatRoom: (state, action: PayloadAction<ChatRoomType | null>) => {
            state.selectedChatRoom = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetChatRooms.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAsyncGetChatRooms.fulfilled, (state, action: PayloadAction<ChatRoomGetResponseType>) => {
            state.isLoading = false;
            state.error = null;
            if ("data" in action.payload && action.payload.data) {
                state.chatRooms = action.payload.data;
                for (const room of action.payload.data) {
                    for (const userId of room.participant_ids) {
                        if (!state.onlineUsers.includes(userId)) {
                            state.onlineUsers.push(userId);
                        }
                    }
                }
            }
        });
        builder.addCase(fetchAsyncGetChatRooms.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Failed to fetch chat rooms";
        });
        // Create chat room
        builder.addCase(fetchAsyncCreateChatRoom.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAsyncCreateChatRoom.fulfilled, (state, action: PayloadAction<ChatRoomCreateResponseType>) => {
            state.isLoading = false;
            state.error = null;
            console.log("Chat room created successfully:", action.payload);
        });
        builder.addCase(fetchAsyncCreateChatRoom.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Failed to create chat room";
        });
    },
})

export default chatSlice.reducer;
export const { clearChatRooms, setSelectedChatRoom } = chatSlice.actions; // Selector to get chat rooms from state