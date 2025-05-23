import { ChatRoomType } from "../../types/chatType";
import UserCard from "../UserCard/UserCard";

interface ChatDetailDialogProps {
  chatRoom: ChatRoomType;
  handleLeaveChatRoom: (id: number) => void;
  handleCopyInviteLink: (inviteLink: string) => void;
  successMessage?: string | null;
  errorMessage?: string | null;
  isLoading?: boolean;
  isShowConfirm?: boolean;
  handleCloseConfirm?: () => void;
  handleShowConfirm?: () => void;
  inviteCode?: string | null;
}

const ChatDetailDialog = ({ inviteCode,isShowConfirm, handleCloseConfirm, handleShowConfirm, isLoading ,chatRoom, handleLeaveChatRoom, handleCopyInviteLink, successMessage, errorMessage }: ChatDetailDialogProps) => {

  const inviteLink = `${window.location.origin}/invite?id=${chatRoom.id}&code=${inviteCode}`;

  return (
    <dialog id="chat_detail_dialog" className="modal">
      <div className="modal-box flex flex-col gap-6 backdrop-blur-xl bg-off-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {/* Chat room name */}
        <h1 className="font-bold text-lg text-center w-full px-2 inline-block truncate">{chatRoom.name}</h1>

        {/* Invite link */}
        <div className="space-y-2">
          <span className="text-sm px-2 text-zinc-400 self-start">
            Invite link
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="input input-bordered w-full"
              value={inviteLink}
              readOnly
            />
            <button
              className="btn btn-neutral h-full"
              onClick={() => handleCopyInviteLink(inviteLink)}
            >
              Copy
            </button>
          </div>

          {/* Success or error message */}
            {successMessage && (
              <p className="text-sm text-green-500 px-2 animate-fade-in">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-sm text-red-500 px-2 animate-fade-in">{errorMessage}</p>
            )}
        </div>

        {/* Members list */}
        <div className="space-y-2">
          <span className="text-sm px-2 text-zinc-400 self-start">Members</span>
          <div className="overflow-y-auto max-h-72 flex flex-col gap-6 p-4 w-full border border-purple-300 rounded-xl">
            {chatRoom.participants.map((member) => (
              <a href={`${window.location.origin}/profile/${member.username}`} target="_blank" key={member.id}>
                <UserCard user={member} />
              </a>
            ))}
          </div>
        </div>

        {/* Leave chat room */}
        <div className="grid min-w-[80px] place-items-center w-full">
          { isShowConfirm ? (
              <div className="flex flex-col w-full items-center animate-fade-in">
                <p className="text-md font-bold text-black px-2">Are you sure?</p>
                <div className="flex gap-4 w-full justify-center">
                  <button className="btn btn-neutral w-1/3 text-off-white my-4" onClick={handleCloseConfirm}>
                    Cancel
                  </button>
                  <button className="btn btn-error w-1/3 text-off-white my-4" onClick={() => handleLeaveChatRoom(chatRoom.id)}>
                    {isLoading ? (<span className="loading loading-spinner loading-md text-off-white"></span>) : "Yes, I want to leave"}
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn btn-error self-center w-1/2 text-off-white animate-fade-in" onClick={handleShowConfirm}>
                Leave chat room
              </button>
            )
          }
        </div>
      </div>
    </dialog>
  );
};

export default ChatDetailDialog;
