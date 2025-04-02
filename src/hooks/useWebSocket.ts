  // import { useRef } from "react";
  // import { useDispatch } from "react-redux";
  // import { AppDispatch } from "../features/store";
  // import { receiveNewMessage } from "../features/chat/chatSlice";
  // import { getClerk } from "../lib/clerk"; 


  export const useChatSocket = () => {
    // const ws = useRef<WebSocket | null>(null);
    // const dispatch = useDispatch<AppDispatch>();

    // const subscribeToMessages = async () => {
    //   const clerk = await getClerk();

    //   const token = await clerk.session?.getToken();
    //   console.log("Token: ", token);
      
    //   ws.current = new WebSocket(`ws://localhost:8080/v1/ws`);

    //   ws.current.onopen = () => {
    //     console.log("🟢 WebSocket connected");
    //   };

    //   ws.current.onmessage = (event) => {
    //     const message = JSON.parse(event.data);
    //     dispatch(receiveNewMessage(message));
    //       console.log("New message received:", message);
    //   };

    //   ws.current.onclose = () => {
    //     console.log("🔴 WebSocket disconnected");
    //   };
    // };

    // const unsubscribeFromMessages = () => {
    //   ws.current?.close();
    // };

    //return { subscribeToMessages, unsubscribeFromMessages };
  };
