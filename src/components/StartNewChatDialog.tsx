import SearchResultList from "./SearchResultList"
import { UserData } from "../types/userData"
import { Search } from "lucide-react"

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
}

const StartNewChatDialog = ({isSearching, chatName, setChatName, error, handleSearchClicked, handleAddClicked, handleRemoveClicked, results, handleCreatetChatClicked, setInputTerm, inputTerm, user} : StartNewChatDialogProps) => {

  return (
    <dialog id="start_new_chat_dialog" className="modal">
        <div className="modal-box flex flex-col gap-6 backdrop-blur-xl bg-off-white">
            
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 className="font-bold text-lg text-center">Start a new chat</h3>
        
        <label className='grid grid-cols-1 md:grid-cols-[130px,2fr] items-center'>
            <label htmlFor='new_chat_name'>Name</label>
            <input id='new_chat_name' type="text" className="input w-full input-bordered" placeholder="A cool name for this conversation" 
                    value={chatName ?? ""} onChange={(e) => setChatName(e.target.value)}/>
        </label>

        <form className='grid grid-cols-1 md:grid-cols-[130px,2fr,auto] items-center'>
            <label htmlFor='new_chat_name' >Add members</label>
            <input id='new_chat_name' type="text" className="input input-bordered" placeholder="Find with username" value={inputTerm ?? ""} onChange={(e)=>setInputTerm(e.target.value)}/>
            <button type="submit" className="ml-2" onClick={(e) => handleSearchClicked(e)}><Search/></button>
        </form>

        <SearchResultList isSearching={isSearching} error={error} results={results} user={user} handleAddClicked={handleAddClicked} handlRemoveClicked={handleRemoveClicked}/>

        <button className="btn btn-primary my-4" disabled={results.length === 0} onClick={handleCreatetChatClicked}>
           Create chat
        </button>

        </div>
    </dialog>
  )
}

export default StartNewChatDialog
