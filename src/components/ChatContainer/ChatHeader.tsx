import { X } from "lucide-react";
import { setSelectedChatRoom } from "../../features/chat/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import defaultImage from "../../assets/avatar.png";
import { UserData } from "../../types/userData";

const ChatHeader = () => {
    const { selectedChatRoom } = useSelector((state: RootState) => state.chat);
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    console.log("selectedChatRoom", selectedChatRoom);

    const selectedUser : UserData | undefined= selectedChatRoom?.participants.filter(users => users.id != user?.id)[0];
  
    return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar relative">
            <div className="size-10 rounded-full">
              <img src={selectedChatRoom?.type === 'dm' ? 
                selectedUser ? selectedUser?.image_url : selectedChatRoom?.participants[0].image_url : 
                selectedChatRoom?.image_url || defaultImage} 
                alt={setSelectedChatRoom.name} />
                
                {selectedChatRoom?.participants.some(mem => mem.is_online == true) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-1 ring-zinc-900" />
            )}
            </div>
          </div>

          {/*Name & Status*/}
          <div>
            <div className="max-w-[150px] md:max-w-[500px] xl:max-w-[700px] w-full">
              <h3 className="font-medium truncate">{selectedChatRoom?.name}</h3>
            </div>
            <p className="text-sm text-base-content/70">
              {selectedChatRoom?.participants.some(mem => mem.is_online == true) ? "Online" : "Offline"}
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