import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { formatMessageTime } from "../../lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { fetchAsyncGetMessagesByChatRoomId } from "../../features/chat/chatSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import default_avatar from "../../assets/avatar.png";
//import { useChatSocket } from "../../hooks/useWebSocket";

const ChatContainer = () => {
  // const {
  //   subscribeToMessages,
  //   unsubscribeFromMessages,
  // } = useChatSocket();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isMessagesLoading, selectedChatRoom, messages} = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!selectedChatRoom) return;
    dispatch(fetchAsyncGetMessagesByChatRoomId(selectedChatRoom.id));
    //subscribeToMessages();

    //return () => unsubscribeFromMessages();
  }, [dispatch, selectedChatRoom]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.sender_id}
            className={`chat ${message.sender_id === user?.id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender_id === user?.id
                      ? user.image_url || default_avatar
                      : selectedChatRoom?.participants.find(p => p.id ===  message.sender_id)?.image_url || default_avatar
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.timestamp)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {/* {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )} */}
              {message.content && <p>{message.content}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;