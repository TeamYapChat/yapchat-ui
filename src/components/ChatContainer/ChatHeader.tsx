import { X } from "lucide-react";
import { setSelectedChatRoom } from "../../features/chat/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import defaultImage from "../../assets/avatar.png";
import { UserData } from "../../types/userData";

const ChatHeader = () => {
    const { selectedChatRoom, onlineUsers } = useSelector((state: RootState) => state.chat);
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const selectedUser : UserData | undefined= selectedChatRoom?.participants.filter(users => users.id != user?.id)[0];
  
    return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedChatRoom?.type === 'dm' ? 
                selectedUser ?  selectedUser?.image_url : selectedChatRoom?.participants[0].image_url : defaultImage} 
                alt={setSelectedChatRoom.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.username || selectedChatRoom?.name}</h3>
            <p className="text-sm text-base-content/70">
              {selectedUser?.id && onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => dispatch(setSelectedChatRoom(null))}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;