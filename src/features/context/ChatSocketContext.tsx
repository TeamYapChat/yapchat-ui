import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
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

export const ChatSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = (message: string, id: number) => {
    const dispatchPayload = {
      op: 0,
      data: {
        content: message,
        room_id: id,
      },
      timestamp: new Date().toISOString(),
    };

    ws?.send(JSON.stringify(dispatchPayload));
    console.log("📤 Message sent:", dispatchPayload);
  };

  const connectWebSocket = useCallback(async () => {
    const clerk = await getClerk();
    const token = await clerk.session?.getToken();

    // TODO: Dynamically read WebSocket URL
    const socket = new WebSocket("wss://api.yapchat.xyz/ws");

    socket.onopen = () => {
      console.log("🟢 WebSocket connected");

      const identifyPayload = {
        op: 1,
        data: {
          token: token,
        },
        timestamp: new Date().toISOString(),
      };

      socket.send(JSON.stringify(identifyPayload));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as MessageType;
      dispatch(receiveNewMessage(data));
    };

    socket.onerror = (error) => {
      console.error("❗ WebSocket error:", error);
      socket.close(); // Force close to trigger reconnect
    };

    socket.onclose = (event) => {
      console.warn(`🔴 WebSocket closed. Reconnecting in 3s...`, event.reason);
      reconnectTimer.current = setTimeout(() => {
        connectWebSocket(); // Reconnect after delay
      }, 3000);
    };

    setWs(socket); // ✅ Update ws in state to trigger re-render
  }, [dispatch]);

  useEffect(() => {
    connectWebSocket(); // connect on mount

    return () => {
      ws?.close();
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
  }, [connectWebSocket]);

  return (
    <ChatSocketContext.Provider value={{ ws, sendMessage }}>
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
