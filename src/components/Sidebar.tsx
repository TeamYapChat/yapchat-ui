import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import StartNewChatDialog from "./StartNewChatDialog";
import ChatRoomList from "./ChatRoomList";
import useChatList from "../hooks/useChatList";
import { MessageCirclePlus } from "lucide-react";
import { useState } from "react";
import { UserData } from "../types/userData";
import chatApis from "../api/chatApis";

const Sidebar = () => {
  const {
    isLoading,
    selectedChatRoom,
    shownChatRooms,
    handleChatClicked,
    showOnlineOnly,
    setShowOnlineOnly,
    onlineUsers,
    user
  } = useChatList();

const [results, setResults] = useState<UserData[]>([{
  id: 1,
  created_at: new Date(),
  email: "test@gmail.com",
  username: "test",
  image_url: "https://m.media-amazon.com/images/I/71WbcekHTbL.jpg",
  is_online: true
},
{
  id: 1,
  created_at: new Date(),
  email: "test@gmail.com",
  username: "test",
  image_url: "https://m.media-amazon.com/images/I/71WbcekHTbL.jpg",
  is_online: true
},]);

const handleAddNewChatClicked = () => {
  const dialog = document?.getElementById('start_new_chat_dialog') as HTMLDialogElement | null;
  dialog?.showModal();
  // Clear search results
  setResults([]);
}

const handleSearchClicked = (e :React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    chatApis.searchUser("huuphuc3").then((response) => {
      const data : UserData = response.data;
      console.log(data);
      setResults([data]);
    }
    ).catch((error) => {
      console.log(error);
    });
  }
  catch (error) {
    console.log(error);
  }
} 

const handleCreatetChatClicked = () => {
  const dialog = document?.getElementById('start_new_chat_dialog') as HTMLDialogElement | null;
  dialog?.close();
  // Clear search results
  setResults([]);
}
    
  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-off-white/70 border-r border-base-300 flex flex-col transition-all duration-200">
      
    <StartNewChatDialog handleSearchClicked={handleSearchClicked} results={results} handleCreatetChatClicked={handleCreatetChatClicked}/>

    <div className="border-b border-base-300 w-full p-4">

      <div className="flex items-center gap-2">
        <Users className="hidden lg:block size-6" />
        <span className="font-medium hidden lg:block text-md">Contacts</span>

        <MessageCirclePlus className="block lg:hidden mx-auto" onClick={handleAddNewChatClicked}/>
        <button className="hidden lg:block btn btn-sm btn-ghost ml-auto" onClick={handleAddNewChatClicked}> Start new chat </button>
      </div>

      <div className="mt-2 hidden lg:flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => {setShowOnlineOnly(e.target.checked)}}
            className="checkbox checkbox-sm"
          />
          <span className="text-xs">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
      </div>
    </div>

    <ChatRoomList shownChatRooms={shownChatRooms} handleChatClicked={handleChatClicked} selectedChatRoom={selectedChatRoom} user={user} onlineUsers={onlineUsers}/>
  </aside>
  )
}

export default Sidebar
