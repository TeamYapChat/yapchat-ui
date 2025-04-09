import background from "../assets/chat_bg.jpg";
import { ChatRoomType } from "../types/chatType";

const mockChatRoom : Partial<ChatRoomType>= {
  id: 1,
  name: "General",
  type: "group",
  participants: [],
}

const InviteHandlerPage = () => {
  return (
    <div className="grid place-items-center h-screen w-full overflow-hidden p-4 relative">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
      <div className="animate-fade-in bg-off-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 items-center">
        Your are invited. Please click the link to join the chat room.
        <div className="border-2 border-base-300 bg-off-white rounded-xl p-4 w-full flex flex-col gap-4">


          <h1 className="font-bold text-lg text-center">{mockChatRoom.name}</h1>
            <div className="space-y-2">
              <span className="text-sm px-2 text-zinc-400 self-start">
                Invite link
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={`https://yap-chat.com/invite/${mockChatRoom.id}`}
                  readOnly
                />
              </div>
          </div>

        </div>
         
        <button className="btn btn-primary h-full">Join</button>


      </div>
    </div>
  );
};

export default InviteHandlerPage;
