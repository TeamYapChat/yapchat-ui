import SearchResultList from "./SearchResultList"
import { UserData } from "../types/userData"
import { Search } from "lucide-react"

interface StartNewChatDialogProps {
    handleSearchClicked: (e : React.MouseEvent<HTMLButtonElement>) => void;
    results: UserData[];
    handleCreatetChatClicked: () => void;
}

const StartNewChatDialog = ({handleSearchClicked, results, handleCreatetChatClicked} : StartNewChatDialogProps) => {

  return (
    <dialog id="start_new_chat_dialog" className="modal">
        <div className="modal-box flex flex-col gap-6 backdrop-blur-xl bg-off-white">
            
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 className="font-bold text-lg text-center">Start a new chat</h3>
        
        <label className='grid grid-cols-1 md:grid-cols-[130px,2fr] items-center'>
            <label htmlFor='new_chat_name'>Name</label>
            <input id='new_chat_name' type="text" className="input w-full input-bordered" placeholder="A cool name for this conversation" />
        </label>

        <form className='grid grid-cols-1 md:grid-cols-[130px,2fr,auto] items-center'>
            <label htmlFor='new_chat_name' >Add members</label>
            <input id='new_chat_name' type="text" className="input input-bordered" placeholder="Find with username" />
            <button type="submit" className="ml-2" onClick={(e) => handleSearchClicked(e)}><Search/></button>
        </form>

        <SearchResultList results={results} />

        <button className="btn btn-primary my-4" disabled={results.length === 0} onClick={handleCreatetChatClicked}>Create</button>

        </div>
    </dialog>
  )
}

export default StartNewChatDialog
