import Sidebar from "../components/SideBar/Sidebar";
import ChatContainer from "../components/ChatContainer/ChatContainer";
import NoChatSelected from "../components/ChatContainer/NoChatSelected";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import background from "../assets/chat_bg.jpg";
import { ChatSocketProvider } from "../features/context/ChatSocketContext";

const HomePage = () => {

  const { selectedChatRoom } = useSelector((state: RootState) => state.chat);

  return(
    <main>
      <ChatSocketProvider>
        <div className="h-screen">

          {/* Background image and overlay */}
          <img src={background} className="absolute inset-0 object-cover w-full h-full -z-20"/>
          <div className="absolute inset-0 bg-white opacity-40 -z-10"></div> 

          <div className="flex items-center justify-center pt-20 px-4 animate-fade-in">
            <div className="backdrop-blur-md bg-off-white/40 rounded-xl full-shadow w-full max-w-6xl h-[calc(100vh-8rem)] mt-4">
              <div className="flex h-full rounded-lg overflow-hidden">
                {/* Sidebar and ChatContainer */}
                <Sidebar />

                {!selectedChatRoom ? <NoChatSelected /> : <ChatContainer />}
              </div>
            </div>
            </div>
          </div>

      </ChatSocketProvider>
    </main>
  ) 
};

export default HomePage;
