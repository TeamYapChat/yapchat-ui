import { Link } from "react-router-dom";
import background from "../assets/chat_bg.jpg";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <img
        src={background}
        className="absolute inset-0 object-cover w-full h-full -z-20"
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-10">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-2xl text-gray-600">Oops! Page not found.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 text-off-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg hover:scale-110 shadow-lg duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
