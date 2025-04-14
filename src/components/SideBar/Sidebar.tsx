import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import StartNewChatDialog from "./StartNewChatDialog";
import ChatRoomList from "../SideBar/ChatRoomList";
import useChatList from "../../hooks/useChatList";
import { MessageCirclePlus } from "lucide-react";
import useDialog from "../../hooks/useDialog";

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

  const {
    results,
    inputTerm,
    setInputTerm,
    foundUser,
    error,
    chatName,
    setChatName,
    isSearching,
    handleAddNewChatClicked,
    handleSearchClicked,
    handleAddClicked,
    handleRemoveClicked,
    handleCreatetChatClicked,
    isUploadingProfile,
    selectedImg,
    handleImageUpload
  } = useDialog();

  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-off-white/70 border-r border-base-300 flex flex-col transition-all duration-200 animate-fade-in">
      
    <StartNewChatDialog isSearching={isSearching} chatName={chatName} setChatName={setChatName} error={error} 
                        handleRemoveClicked={handleRemoveClicked} 
                        handleAddClicked={handleAddClicked} 
                        handleSearchClicked={handleSearchClicked} 
                        results={results} 
                        handleCreatetChatClicked={handleCreatetChatClicked} 
                        setInputTerm={setInputTerm} 
                        inputTerm={inputTerm} 
                        user={foundUser}
                        isUploadingProfile={isUploadingProfile}
                        selectedImg={selectedImg}
                        handleImageUpload={handleImageUpload}/>

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
        <span className="text-xs text-zinc-500">({onlineUsers.length != 0 ? onlineUsers.length - 1 : 0} online)</span>
      </div>
    </div>

    <ChatRoomList showOnlineOnly={showOnlineOnly} shownChatRooms={shownChatRooms} handleChatClicked={handleChatClicked} selectedChatRoom={selectedChatRoom} user={user} onlineUsers={onlineUsers}/>
  </aside>
  )
}

export default Sidebar
