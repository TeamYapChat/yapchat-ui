import { createContext, useContext, useRef, useEffect } from "react";
import { getClerk } from "../../lib/clerk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { receiveNewMessage } from "../chat/chatSlice";
import { MessageType } from "../../types/chatType";

type ChatSocketContextType = {
    ws: WebSocket | null;
    sendMessage: (message: string, id: number) => void;
  };

const ChatSocketContext = createContext<ChatSocketContextType | null>(null);

export const ChatSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ws = useRef<WebSocket | null>(null);

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

  useEffect(() => {
    const connectWebSocket = async () => {
      // Prepare token for first message exchange
      const clerk = await getClerk();
      const token = await clerk.session?.getToken();

      // Open websocket connection
      ws.current = new WebSocket("ws://localhost:8080/ws");
      
      // When connected, send the identify payload
      ws.current.onopen = async () => {

        console.log("🟢 WebSocket connected");
  
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        const identifyPayload = {
          op: 1,
          data: {
            token: token,
          },
          timestamp: new Date().toISOString(),
        };
  
        ws.current?.send(JSON.stringify(identifyPayload));
      };


      // Listen for messages from the server
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data) as MessageType;
        console.log("Received message:", data);
        dispatch(receiveNewMessage(data));
      }
  
      ws.current.onclose = () => {
        console.log("🔴 WebSocket closed");
      };
    };
  
    connectWebSocket();
  
    return () => {
      ws.current?.close();
    };
  }, [dispatch]);
  
  return (
    <ChatSocketContext.Provider value={{ ws: ws.current, sendMessage }}>
      {children}
    </ChatSocketContext.Provider>
  );
};

export const useChatSocket = () => {
    const context = useContext(ChatSocketContext);
    if (!context) {
      throw new Error("useChatSocket must be used within a ChatSocketProvider");
    }
    return context;
  };
