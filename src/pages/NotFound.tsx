import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 font-sans">
      <div className="text-center bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
        <FaRegSadTear className="text-blue-400 text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-gradientFrom">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link to="/" className="inline-block bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold rounded-full px-8 py-3 shadow hover:scale-105 transition-all">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
