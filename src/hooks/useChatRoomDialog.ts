import { useState } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { fetchAsyncLeaveChatRoom } from "../features/chat/chatSlice";
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

const useChatRoomDialog = () => {
      const [successMessage, setSuccessMessage] = useState<string | null>(null);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);

      const dispatch = useDispatch<AppDispatch>();

      const {isLoading} = useSelector((state: RootState) => state.chat);
  
      const handleCopyInviteLink = async (inviteLink: string) => {
        try {
          await navigator.clipboard.writeText(inviteLink);
          setSuccessMessage("Invite link copied to clipboard!");
          setErrorMessage(null);
        } catch (e) {
          const err = e as Error;
          setErrorMessage(
            "Failed to copy invite link. Please try again. " + err.message
          );
          setSuccessMessage(null);
        }
      };

      const handleShowConfirm = () => {
        setIsShowConfirm(true);
      }

      const handleCloseConfirm = () => {
        setIsShowConfirm(false);    
      }

      
      const handleLeaveChatRoom = async (id : number) => {
        const resultAction = await dispatch(fetchAsyncLeaveChatRoom(id));
        if (fetchAsyncLeaveChatRoom.fulfilled.match(resultAction)) {
            const dialog = document.getElementById("chat_detail_dialog") as HTMLDialogElement | null;
            dialog?.close();
          } else {
            setErrorMessage("Failed to leave chat room. Please try again.");
            setSuccessMessage(null);
          }
      }
      return {
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        handleCopyInviteLink,
        handleLeaveChatRoom,
        dispatch,
        isLoading,
        isShowConfirm,
        handleCloseConfirm,
        handleShowConfirm,
      }
}

export default useChatRoomDialog
