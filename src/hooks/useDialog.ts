import { useState } from "react";
import { UserData } from "../types/userData";
import chatApis from "../api/chatApis";
import { fetchAsyncCreateChatRoom, fetchAsyncGetChatRooms } from "../features/chat/chatSlice";
import { AppDispatch } from "../features/store";
import { useDispatch } from "react-redux";
import { ChatRoomCreateType } from "../types/chatType";

const useDialog = () => {
    const [results, setResults] = useState<UserData[]>([]);
    const [inputTerm, setInputTerm] = useState<string>("");
    const [foundUser, setFoundUser] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [chatName, setChatName] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const handleAddNewChatClicked = () => {
        const dialog = document?.getElementById('start_new_chat_dialog') as HTMLDialogElement | null;
        dialog?.showModal();
        setResults([]);
        setInputTerm("");
        setFoundUser(null);
        setError(null);
        setChatName("");
    }

    const handleSearchClicked = (e :React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          if (inputTerm === "") {
            setFoundUser(null);
            return;
          }
          setIsSearching(true);
          setError(null);
      
          chatApis.searchUser(inputTerm).then((response) => {
            const data : UserData = response.data;
            console.log(data);
            setFoundUser(data);
            setError(null);
            setIsSearching(false);
          }
          ).catch((error) => {
            console.log(error);
            setFoundUser(null);
            setError("User not found");
            setIsSearching(false);
          });
        }
        catch (error) {
          console.log(error);
          setFoundUser(null);
          setError("User not found");
        }
      } 
    const handleAddClicked = () => {
        if (foundUser && !results.some(user => user.id === foundUser.id)) {
            setResults(prev => [...prev,foundUser]);
        }
    }

    const handleRemoveClicked = (user: UserData) => {
        setResults(prev => prev.filter(u => u.id !== user.id));
    }

    const handleCreatetChatClicked = async () => {
        const dialog = document?.getElementById('start_new_chat_dialog') as HTMLDialogElement | null;
        if (chatName === "") {
          setError("Please enter a name for the chat room");
          return;
        }
        const data : ChatRoomCreateType = {
          name: chatName,
          participant_ids: results.map(user => user.id),
          type: results.length > 1 ? "group" : "dm"
        }
        // Create chat room
        const result = await dispatch(fetchAsyncCreateChatRoom(data));
        if (fetchAsyncCreateChatRoom.fulfilled.match(result)) {
          await dispatch(fetchAsyncGetChatRooms());
        }
        // Close dialog
        dialog?.close();
        // Clear search results
        setFoundUser(null);
    }
  return {
    results,
    setResults,
    inputTerm,
    setInputTerm,
    foundUser,
    setFoundUser,
    error,
    setError,
    chatName,
    setChatName,
    isSearching,
    setIsSearching,
    handleAddNewChatClicked,
    handleSearchClicked,
    handleAddClicked,
    handleRemoveClicked,
    handleCreatetChatClicked
  }
}

export default useDialog
