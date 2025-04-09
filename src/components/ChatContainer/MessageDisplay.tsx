import default_avatar from "../../assets/avatar.png";
import { formatMessageTime } from "../../lib/utils";
import { UserData } from "../../types/userData";
import { ChatRoomType, MessageType } from "../../types/chatType";
import { LegacyRef } from "react";

interface MessageDisplayProps {
    messages: MessageType[];
    messageEndRef:LegacyRef<HTMLDivElement>;
    user: UserData | null;
    selectedChatRoom: ChatRoomType | null;
}

const MessageDisplay = ({messageEndRef, messages, selectedChatRoom, user} : MessageDisplayProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.sender_id + message.timestamp}
            className={`chat ${message.sender_id === user?.id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender_id === user?.id
                      ? user?.image_url || default_avatar
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

            <div className={`chat-bubble flex flex-col backdrop-blur-sm break-words max-w-[75%] ${message.sender_id === user?.id ? "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-off-white" : "bg-slate-200 text-black"}`}>
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
  )
}

export default MessageDisplay
