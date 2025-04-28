import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import {
  fetchAsyncGetChatRooms,
  setSelectedChatRoom,
} from "../features/chat/chatSlice";
import { fetchAsyncGetUser } from "../features/auth/authSlice";
import { AppDispatch } from "../features/store";
import { ChatRoomType } from "../types/chatType";

const useChatList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatRooms, isLoading, selectedChatRoom, onlineUsers } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [shownChatRooms, setShownChatRooms] = useState<ChatRoomType[]>();

  // Fetch chat rooms and user info
  useEffect(() => {
    dispatch(fetchAsyncGetChatRooms());
    dispatch(fetchAsyncGetUser());
  }, [dispatch]);

  // Filter chat rooms based on "showOnlineOnly"
  useEffect(() => {
    if (showOnlineOnly && user) {
      setShownChatRooms(
        chatRooms.filter((chatRoom) =>
          chatRoom.participants.some(
            (friend) => friend.id !== user.id && onlineUsers.includes(friend.id)
          )
        )
      );
    } else {
      setShownChatRooms(chatRooms);
    }
  }, [showOnlineOnly, chatRooms, onlineUsers, user]);

  const handleChatClicked = (chatRoom: ChatRoomType) =>
    dispatch(setSelectedChatRoom(chatRoom));

  return {
    isLoading,
    selectedChatRoom,
    shownChatRooms,
    handleChatClicked,
    showOnlineOnly,
    setShowOnlineOnly,
    onlineUsers,
    user,
  };
};

export default useChatList;
