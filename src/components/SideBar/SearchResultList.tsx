import { UserData } from "../../types/userData";
import UserCard from "../UserCard/UserCard";

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

const SearchResult = ({ user, handleAddClicked }: SearchResultProps) => {
  return (
    <div className="px-8 flex flex-row">
      <UserCard user={user!} />

      <button
        className="btn bg-green-500 hover:bg-green-400 ml-auto text-off-white"
        onClick={handleAddClicked}
      >
        {" "}
        Add{" "}
      </button>
    </div>
  );
};

const SearchResultList = ({
  isSearching,
  results,
  user,
  handleAddClicked,
  handlRemoveClicked,
  error,
}: SearchResultListProps) => {
  return (
    <>
      {isSearching && <div className="loading loading-spinner"></div>}
      {error && <span className="text-red-500">{error}</span>}
      {user && (
        <SearchResult
          user={user}
          handleAddClicked={handleAddClicked}
          error={error}
        />
      )}
      <div className="flex flex-col gap-4 overflow-y-auto max-h-64 min-h-fit border-gray-300 rounded-lg border-2 p-4">
        {results.length === 0 ? (
          <div className="opacity-70">No members added</div>
        ) : (
          results.map((user) => (
            <div className="px-4 flex flex-row" key={user.id}>
              <UserCard user={user} />
              <button
                className="btn bg-red-500 hover:bg-red-400 ml-auto text-off-white"
                onClick={() => handlRemoveClicked(user)}
              >
                {" "}
                Remove{" "}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SearchResultList;
