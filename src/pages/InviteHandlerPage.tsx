import background from "../assets/chat_bg.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chatApis from "../api/chatApis";
import { ChatRoomType } from "../types/chatType";
import defaultAvatar from "../assets/avatar.png";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { setSelectedChatRoom } from "../features/chat/chatSlice";

const InviteHandlerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [chatRoom, setChatRoom] = useState<ChatRoomType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParams = new URLSearchParams(location.search);
  const inviteCode = searchParams.get("code");
  const chatRoomId = searchParams.get("id");

  useEffect(() => {
    if (!inviteCode || !chatRoomId) {
      navigate("/");
    }
    else{
      // fetch chat room data using chatRoomId
      chatApis.getChatRoomById(Number(chatRoomId)).then((response) => { 
        if (response.success) {
          setChatRoom(response.data);
        }
      }
      ).catch((error) => {
        toast.error(`Error fetching chat room data. Please try again. ${error.message}`);
      }
      ).finally(() => {
        setIsLoading(false);
      })
    }
  },[inviteCode, chatRoomId, navigate]);

  const handleAcceptInviteClick = () => {
    // Call api
    chatApis.acceptInvite(Number(chatRoomId), inviteCode!).then((response) => {
      if (response.success) {
        toast.success("You have joined the chat room!");
      }
    }
    ).catch((error) => {
      toast.error(`Error fetching chat room data. Please try again. ${error.message}`);
    });

    // Set chat room data to redux store
    dispatch(setSelectedChatRoom(chatRoom));

    // Navigate to chat room page
    navigate(`/`);
  }

  return (
    <div className="grid place-items-center h-screen w-full overflow-hidden p-4 relative">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
      {isLoading ? <span className="loading loading-spinner loading-md"/> : <div className="animate-fade-in w-full max-w-lg m-6 bg-off-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 items-center">
        
        {/* Avatar */}
        <div className="avatar relative">
          <div className="rounded-full w-32 border-black border-2">
            <img src={chatRoom?.image_url? chatRoom?.image_url : defaultAvatar} alt={chatRoom?.name} />
          </div>
        </div>

        {/* Description */}
        <span className="text-zinc-400">Your are invited to join</span>

        {/* Chat room name */}
        <h1 className="text-2xl text-center inline-block w-full truncate">{chatRoom?.name}</h1>

        {/* Status */}
        <div className="flex flex-row gap-4 w-full justify-center items-center">
          <div className="flex flex-row bg-off-white justify-center items-center rounded-xl h-8 px-4 gap-2">
            <span className="w-[12px] aspect-square rounded-full bg-green-400"/>
            <div className="text-zinc-400">{chatRoom?.participants.filter(mem => mem.is_online == true).length} Online</div>
          </div>
          <div className="flex flex-row bg-off-white justify-center items-center rounded-xl h-8 px-4 gap-2">
            <span className="w-[12px] aspect-square rounded-full bg-slate-400"/>
            <div className="text-zinc-400">{chatRoom?.participants.length} Members</div>
          </div>
        </div>

        <button className="btn btn-neutral h-full w-[80%] mt-6" onClick={handleAcceptInviteClick}>Accept Invite</button>

      </div>}
      
    </div>
  );
};

export default InviteHandlerPage;
