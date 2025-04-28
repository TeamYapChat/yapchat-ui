import { useState } from "react";
import { UserData } from "../types/userData";
import chatApis from "../api/chatApis";
import { fetchAsyncCreateChatRoom, fetchAsyncGetChatRooms, fetchAsyncUploadImage } from "../features/chat/chatSlice";
import { AppDispatch } from "../features/store";
import { useDispatch } from "react-redux";
import { ChatRoomCreateType } from "../types/chatType";
import { RootState } from "../features/store";
import { useSelector } from "react-redux";

const useDialog = () => {
    const [results, setResults] = useState<UserData[]>([]);
    const [inputTerm, setInputTerm] = useState<string>("");
    const [foundUser, setFoundUser] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [chatName, setChatName] = useState<string>("");
    const [uploadedURL, setUploadedURL] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const {isUploadingProfile} = useSelector((state: RootState) => state.chat);

    const dispatch = useDispatch<AppDispatch>();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFile(file);
  
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const base64Image = reader.result;
        if (typeof base64Image === 'string') {
          setSelectedImg(base64Image);
        }
      };
    };

    const handleAddNewChatClicked = () => {
        const dialog = document?.getElementById('start_new_chat_dialog') as HTMLDialogElement | null;
        dialog?.showModal();
        setResults([]);
        setInputTerm("");
        setFoundUser(null);
        setError(null);
        setChatName("");
        setSelectedImg(null);
        setUploadedURL(null);
        setFile(null);
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
        
        let finalUploadedURL = uploadedURL;

        if (file !== null) {
          const uploadResult = await dispatch(fetchAsyncUploadImage(file));
          if (fetchAsyncUploadImage.fulfilled.match(uploadResult)) {
            finalUploadedURL = uploadResult.payload as string;
            setUploadedURL(finalUploadedURL);
            const data : ChatRoomCreateType = {
              name: chatName,
              participant_ids: results.map(user => user.id),
              type: results.length > 1 ? "group" : "dm",
              image_url: finalUploadedURL ?? null,
            }
            
            console.log("data", data);  
            // Create chat room
            const result = await dispatch(fetchAsyncCreateChatRoom(data));
            if (fetchAsyncCreateChatRoom.fulfilled.match(result)) {
              await dispatch(fetchAsyncGetChatRooms());
            }
          } else {
            setError("Failed to upload image");
            return;
          }
        }
        else{
          const data : ChatRoomCreateType = {
            name: chatName,
            participant_ids: results.map(user => user.id),
            type: results.length > 1 ? "group" : "dm",
            image_url: null,
          }
          // Create chat room
          const result = await dispatch(fetchAsyncCreateChatRoom(data));
          if (fetchAsyncCreateChatRoom.fulfilled.match(result)) {
            await dispatch(fetchAsyncGetChatRooms());
          }
        }

        // Close dialog
        dialog?.close();
        // Clear search results
        setFoundUser(null);
        setSelectedImg(null);
    }
  return {
    isUploadingProfile,
    selectedImg,
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
    handleCreatetChatClicked,
    handleImageUpload,
  }
}

export default useDialog
