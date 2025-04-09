import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { fetchAsyncGetMessagesByChatRoomId } from "../../features/chat/chatSlice";
import ChatDetailDialog from "./ChatDetailDialog";
import MessageDisplay from "./MessageDisplay";
import useChatRoomDialog from "../../hooks/useChatRoomDialog";

const ChatContainer = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isMessagesLoading, selectedChatRoom, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const {
    successMessage,
    errorMessage,
    handleCopyInviteLink,
    handleLeaveChatRoom,
    dispatch,
    isLoading,
    isShowConfirm,
    handleCloseConfirm,
    handleShowConfirm,
  } = useChatRoomDialog();

  useEffect(() => {
    if (!selectedChatRoom) return;
    dispatch(fetchAsyncGetMessagesByChatRoomId(selectedChatRoom.id));
  }, [dispatch, selectedChatRoom]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleHeaderClick = () => {
    const dialog = document?.getElementById(
      "chat_detail_dialog"
    ) as HTMLDialogElement | null;
    dialog?.showModal();
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Chat Header */}
      <div onClick={handleHeaderClick} className="cursor-pointer">
        <ChatHeader />
      </div>

      {/* Chat Detail Modal */}
      <ChatDetailDialog
        chatRoom={selectedChatRoom!}
        handleCopyInviteLink={handleCopyInviteLink}
        handleLeaveChatRoom={handleLeaveChatRoom}
        successMessage={successMessage}
        errorMessage={errorMessage}
        isLoading={isLoading}
        isShowConfirm={isShowConfirm}
        handleCloseConfirm={handleCloseConfirm}
        handleShowConfirm={handleShowConfirm}
      />

      <MessageDisplay
        messages={messages}
        messageEndRef={messageEndRef}
        user={user}
        selectedChatRoom={selectedChatRoom}
      />

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
