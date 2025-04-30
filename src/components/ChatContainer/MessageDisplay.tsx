import default_avatar from "../../assets/avatar.png";
import { formatMessageTime } from "../../lib/utils";
import { UserData } from "../../types/userData";
import { ChatRoomType, MessageType } from "../../types/chatType";
import { LegacyRef } from "react";
import { useRef, useEffect, useLayoutEffect } from "react";

interface MessageDisplayProps {
  messages: MessageType[];
  messageEndRef: LegacyRef<HTMLDivElement>;
  user: UserData | null;
  selectedChatRoom: ChatRoomType | null;
  isMoreMessagesLoading: boolean;
  page: number;
  totalPages: number;
  loadMoreMessages: (page: number) => void;
  setCurrentScrollY: (scrollY: number) => void;
  currentScrollY: number;
}

const MessageDisplay = ({
  messageEndRef,
  messages,
  selectedChatRoom,
  user,
  isMoreMessagesLoading,
  page,
  totalPages,
  loadMoreMessages,
  setCurrentScrollY,
  currentScrollY,
}: MessageDisplayProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null); 

  const handleScroll = () => {
    const container = containerRef.current;

    if (page >= totalPages) {
      return;
    }

    if (container) {
      const scrollPosition = container.scrollTop;

      if (scrollPosition === 0 && !isMoreMessagesLoading) {
        setCurrentScrollY(container.scrollHeight - container.scrollTop); // This is actually = scrollHeight , we are measuring from the bottom
        loadMoreMessages(page + 1);
      }
    }
  };

  // Scroll the current oldest message to the bottom after loading more messages
  useLayoutEffect(() => { // run before the browser repaints the screen => scroll to the latest message to top of the screen
    const container = containerRef.current;
    container?.scrollTo({
      top:
        container.scrollHeight - currentScrollY - container.offsetHeight > 0 ? container.scrollHeight - currentScrollY - container.offsetHeight : 0,// + 100, // +100 (shift down) to perfectly move bring the last message before loading more messages, to top of the screen
      behavior: "auto",
    });
  }, [page]); // watching the page because only when the page changes, we need to scroll to the latest message before loading

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={containerRef}>
      {isMoreMessagesLoading && (
        <div className="w-full grid place-items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={`${message.sender_id}${message.timestamp}`}
          className={`chat ${
            message.sender_id === user?.id ? "chat-end" : "chat-start"
          }`}
          ref={messageEndRef}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.sender_id === user?.id
                    ? user?.image_url || default_avatar
                    : selectedChatRoom?.participants.find(
                        (p) => p.id === message.sender_id
                      )?.image_url || default_avatar
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

          <div
            className={`chat-bubble flex flex-col backdrop-blur-sm break-words max-w-[75%] ${
              message.sender_id === user?.id
                ? "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-off-white"
                : "bg-slate-200 text-black"
            }`}
          >
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
  );
};

export default MessageDisplay;
