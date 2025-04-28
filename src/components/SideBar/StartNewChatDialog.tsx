import SearchResultList from "../SideBar/SearchResultList"
import { UserData } from "../../types/userData"
import { Search } from "lucide-react"
import defaultAvatar from "../../assets/avatar.png"
import { Camera } from "lucide-react"

interface StartNewChatDialogProps {
    handleSearchClicked: (e : React.MouseEvent<HTMLButtonElement>) => void;
    results: UserData[];
    handleCreatetChatClicked: () => void;
    setInputTerm: (term: string) => void;
    user: UserData | null;
    inputTerm: string;
    handleAddClicked:() => void;
    handleRemoveClicked:(user : UserData) => void;
    error: string | null;
    chatName: string;
    setChatName: (name: string) => void;
    isSearching: boolean;
    isUploadingProfile: boolean;
    selectedImg: string | null;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
}

const StartNewChatDialog = ({isLoading, handleImageUpload, isSearching, chatName, setChatName, error, handleSearchClicked, handleAddClicked, handleRemoveClicked, results, handleCreatetChatClicked, setInputTerm, inputTerm, user, isUploadingProfile, selectedImg} : StartNewChatDialogProps) => {
    
  return (
    <dialog id="start_new_chat_dialog" className="modal">
        <div className="modal-box flex flex-col gap-6 backdrop-blur-xl bg-off-white">
            
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 className="font-bold text-lg text-center">Start a new chat</h3>

        <div className="flex flex-col items-center gap-4 self-center">
            <div className="relative">
              <img
                src={selectedImg || defaultAvatar}
                alt="Profile"
                className="size-28 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUploadingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUploadingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
        
        <label className='grid grid-cols-1 md:grid-cols-[130px,2fr] items-center'>
            <label htmlFor='new_chat_name'>Name</label>
            <input id='new_chat_name' type="text" className="input w-full input-bordered" placeholder="A cool name for this conversation" 
                    value={chatName ?? ""} onChange={(e) => setChatName(e.target.value)}/>
        </label>

        <form className='relative grid grid-cols-1 sm:grid-cols-[130px,2fr,auto] items-center'>
            <label htmlFor='new_chat_name' >Add members</label>
            <input id='new_chat_name' type="text" className="input input-bordered" placeholder="Find with username" value={inputTerm ?? ""} onChange={(e)=>setInputTerm(e.target.value)}/>
            <button type="submit" className="absolute right-4 top-1/2 sm:static ml-2" onClick={(e) => handleSearchClicked(e)}><Search/></button>
        </form>

        <SearchResultList isSearching={isSearching} error={error} results={results} user={user} handleAddClicked={handleAddClicked} handlRemoveClicked={handleRemoveClicked}/>

        <button className="btn btn-neutral text-off-white my-4" disabled={results.length === 0 || isLoading} onClick={handleCreatetChatClicked}>
           Create chat
        </button>

        </div>
    </dialog>
  )
}

export default StartNewChatDialog
