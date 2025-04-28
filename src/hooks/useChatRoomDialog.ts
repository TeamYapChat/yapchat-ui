import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { fetchAsyncLeaveChatRoom } from "../features/chat/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import chatApis from "../api/chatApis";
import { ChatRoomInviteCodeResponseType } from "../types/chatType";
import { toast } from "sonner";

const useChatRoomDialog = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, selectedChatRoom } = useSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    const fetchInviteCode = async () => {
      if (selectedChatRoom?.id !== undefined) {
        try {
          const response: ChatRoomInviteCodeResponseType =
            await chatApis.getInviteCode(selectedChatRoom.id);
          if (response.success) {
            // Only access 'data' if the response is successful
            setInviteCode(response.data); // Assuming response.data is the invite code
          } else {
            // Handle error if needed (e.g., show error message)
            console.error("Error:", response.message);
          }
        } catch (error) {
          console.error("Error fetching invite code:", error);
        }
      }
    };

    fetchInviteCode();
  }, [selectedChatRoom]);

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
  };

  const handleCloseConfirm = () => {
    setIsShowConfirm(false);
  };

  const handleLeaveChatRoom = async (id: number) => {
    const resultAction = await dispatch(fetchAsyncLeaveChatRoom(id));
    if (fetchAsyncLeaveChatRoom.fulfilled.match(resultAction)) {
      const dialog = document.getElementById(
        "chat_detail_dialog"
      ) as HTMLDialogElement | null;
      dialog?.close();
      toast.success("You have left the chat room.");
      setErrorMessage(null);
    } else {
      setErrorMessage("Failed to leave chat room. Please try again.");
      setSuccessMessage(null);
    }
  };

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
    inviteCode,
  };
};

export default useChatRoomDialog;
