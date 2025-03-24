import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import background from "../assets/chat_bg.jpg";


const HomePage = () => {

  const { selectedChatRoom } = useSelector((state: RootState) => state.chat);

  return(
    <main>
    <div className="h-screen">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
       <div className="absolute inset-0 bg-white opacity-40 -z-10"></div> 

      <div className="flex items-center justify-center pt-20 px-4">
        <div className="backdrop-blur-md bg-off-white/40 rounded-xl full-shadow w-full max-w-6xl h-[calc(100vh-8rem)] mt-4">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedChatRoom ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
    </main>
  ) 
};

export default HomePage;
