import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { receiveNewMessage } from "../features/chat/chatSlice";
import { getClerk } from "../lib/clerk";

  export const useChatSocket = () => {
     const ws = useRef<WebSocket | null>(null);
     const dispatch = useDispatch<AppDispatch>();

     const subscribeToMessages = async () => {
       const clerk = await getClerk();

      const token = await clerk.session?.getToken();
      
       ws.current = new WebSocket(`ws://localhost:8080/ws`);

        ws.current.onopen = async () => {
          console.log("🟢 WebSocket connected");

          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const identifyPayload = {
            op: 1,
            data: {
              token: token,
            },
            timestamp: new Date(Date.now()).toISOString(),
          }

          ws.current?.send(JSON.stringify(identifyPayload));
        };

        ws.current.onmessage = (event) => {
          console.log("WebSocket instance:", ws.current);

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

    const sendMessage = async (message: string, id: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const dispatchPayload = {
            op: 0,
            data: {
              "content": message,
              "room_id": id,
            },
            timestamp: new Date(Date.now()).toISOString(),
          }

          ws.current?.send(JSON.stringify(dispatchPayload));
        console.log("Message sent:", dispatchPayload);
    }

    return { subscribeToMessages, unsubscribeFromMessages, sendMessage };
  };
