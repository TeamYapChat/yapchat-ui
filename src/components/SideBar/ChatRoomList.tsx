import { ChatRoomType } from "../../types/chatType";
import defaultAvatar from "../../assets/avatar.png";
import { UserData } from "../../types/userData";

interface ChatRoomListProps {
  shownChatRooms: ChatRoomType[] | null | undefined;
  handleChatClicked: (chatRoom: ChatRoomType) => void;
  selectedChatRoom: ChatRoomType | null;
  user: UserData | null;
  onlineUsers: string[];
  showOnlineOnly: boolean;
}

const ChatRoomList = ({showOnlineOnly ,shownChatRooms, handleChatClicked, selectedChatRoom, user, onlineUsers} : ChatRoomListProps) => {

  return (
    <div className="overflow-y-auto w-full pb-3">
      {shownChatRooms == null || shownChatRooms?.length === 0 && !showOnlineOnly  ? <div className="text-center text-zinc-500 py-4 text-xs md:textarea-md">No conversation</div> : shownChatRooms.map((chatRoom) => (
        <button
          key={chatRoom.id}
          onClick={() => handleChatClicked(chatRoom)}
          className={`
            w-full p-3 flex items-center gap-3
            hover:bg-sky-100 transition-colors
            ${selectedChatRoom?.id === chatRoom.id ? "bg-sky-100 ring-1 ring-sky-200" : ""}
          `}
        >
          <div className="relative mx-auto lg:mx-0">
            <img
              src={chatRoom.type === 'dm' ? 
                  chatRoom.participants.filter(users => users.id != user?.id).length !== 0 ? chatRoom.participants.filter(users => users.id != user?.id)[0].image_url :  chatRoom.participants[0].image_url : defaultAvatar}
              alt={chatRoom.name}
              className="size-12 object-cover rounded-full"
            />
            {chatRoom.participants.some(friend => friend.id !== user?.id && onlineUsers.includes(friend.id)) && (
              <span
                className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-1 ring-zinc-900"
              />
            )}
          </div>

          {/* User info - only visible on larger screens */}
          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">{chatRoom.name}</div>
            <div className="text-xs text-zinc-400">
              {chatRoom.participants.some(friend => friend.id !== user?.id && onlineUsers.includes(friend.id)) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}

      {shownChatRooms?.length === 0 && showOnlineOnly && (
        <div className="text-center text-zinc-500 py-4">No online users</div>
      )}
    </div>
  )
}

export default ChatRoomList
