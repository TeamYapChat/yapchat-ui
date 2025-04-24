import { useEffect, useRef, useState } from "react";
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
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isMessagesLoading, selectedChatRoom, messages, page, isMoreMessagesLoading, totalPages } = useSelector(
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
    setSuccessMessage,
    setErrorMessage,
    inviteCode
  } = useChatRoomDialog();

  useEffect(() => {
    if (!selectedChatRoom) return;
    dispatch(fetchAsyncGetMessagesByChatRoomId({chatRoomId: selectedChatRoom.id, page: 1}));
  }, [dispatch, selectedChatRoom]);

  useEffect(() => {
    if (messageEndRef.current && messages && page === 1 && currentScrollY === 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, page, currentScrollY]);

  const handleHeaderClick = () => {
    const dialog = document?.getElementById(
      "chat_detail_dialog"
    ) as HTMLDialogElement | null;
    setSuccessMessage(null);
    setErrorMessage(null);
    dialog?.showModal();
  };

  const loadMoreMessages = async (pageToLoad: number) => {
    if (pageToLoad > totalPages) return;
    await dispatch(fetchAsyncGetMessagesByChatRoomId({ chatRoomId: selectedChatRoom!.id, page: pageToLoad }));
  }

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
    <div className="flex-1 flex flex-col overflow-hidden w-full">
      {/* Chat Header */}
      <div onClick={handleHeaderClick} className="cursor-pointer w-full">
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
        inviteCode={inviteCode}
      />

      <MessageDisplay
        messages={messages}
        messageEndRef={messageEndRef}
        user={user}
        selectedChatRoom={selectedChatRoom}
        isMoreMessagesLoading={isMoreMessagesLoading}
        page={page}
        totalPages={totalPages}
        loadMoreMessages={loadMoreMessages}
        setCurrentScrollY={setCurrentScrollY}
        currentScrollY={currentScrollY} 
      />

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
