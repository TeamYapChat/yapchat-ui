import { UserData } from "../types/userData"

interface SearchResultListProps {
    results: UserData[];
}

const SearchResultList = ({results} : SearchResultListProps) => {
  return (
  <div className="flex flex-col gap-4 overflow-y-auto max-h-64">
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
        </div>
    ))}
    </div>
  )
}

export default SearchResultList
