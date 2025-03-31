import { UserData } from "../types/userData"

interface SearchResultListProps {
    results: UserData[];
    user: UserData | null;
    handleAddClicked: () => void;
    handlRemoveClicked: (user: UserData) => void;
    error: string | null;
    isSearching: boolean;
}

interface SearchResultProps {
    user: UserData | null;
    handleAddClicked: () => void;
    error: string | null;
}

const SearchResult = ({user, handleAddClicked} : SearchResultProps) => {
    return (
        <div className=" px-4 flex flex-row">
        <div className="avatar relative">
            <div className="rounded-full w-12">
                <img src={user?.image_url} alt={user?.username}/>
            </div>

            {user?.is_online && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-1 ring-zinc-900"/>}
        </div>
        <div className="flex flex-col ml-2">
            <span className="font-bold">{user?.username}</span>
            <span className="text-xs text-zinc-400">{user?.is_online ? "Online" : "Offline"}</span>
        </div>

        <button className="btn bg-green-500 hover:bg-green-400 ml-auto text-off-white" onClick={handleAddClicked}> Add </button>
    </div>
    )
};

const SearchResultList = ({isSearching, results, user, handleAddClicked, handlRemoveClicked, error} : SearchResultListProps) => {
  return (<>
    {isSearching && <div className="loading loading-spinner"></div>}
    {error && <span className="text-red-500">{error}</span>}
    {user && <SearchResult user={user} handleAddClicked={handleAddClicked} error={error}/>}
    <div className="flex flex-col gap-4 overflow-y-auto max-h-64 border-gray-300 rounded-lg border-2 p-4">
        {results.length === 0 ? <div>No members added</div> : results.map((user) => (
            <div className="flex flex-row">
                <div className="avatar relative">
                    <div className="rounded-full w-12">
                        <img src={user.image_url} alt={user.username}/>
                    </div>

                    {user.is_online && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-1 ring-zinc-900"/>}
                </div>
                <div className="flex flex-col ml-2">
                    <span className="font-bold">{user.username}</span>
                    <span className="text-xs text-zinc-400">{user.is_online ? "Online" : "Offline"}</span>
                </div>
                <button className="btn bg-red-500 hover:bg-red-400 ml-auto text-off-white" onClick={()=>handlRemoveClicked(user)}> Remove </button>
            </div>
        ))}
    </div>
  </>

  )
}

export default SearchResultList
