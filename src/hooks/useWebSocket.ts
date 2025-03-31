import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { receiveNewMessage } from "../features/chat/chatSlice";
//import { useAuth } from "@clerk/clerk-react";

export const useChatSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  //const { getToken } = useAuth();

  const subscribeToMessages = async () => {
    //const token = await getToken();
    ws.current = new WebSocket(`ws://localhost:8080/v1/ws`);

    ws.current.onopen = () => {
      console.log("🟢 WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(receiveNewMessage(message));
        console.log("New message received:", message);
    };

    ws.current.onclose = () => {
      console.log("🔴 WebSocket disconnected");
    };
  };

  const unsubscribeFromMessages = () => {
    ws.current?.close();
  };

  return { subscribeToMessages, unsubscribeFromMessages };
};
