import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, PhoneCall } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-gray-800 shadow-md fixed w-full top-0 z-40 
      backdrop-blur-md text-white"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all">
          <div className="p-2 rounded-full bg-gray-700 flex items-center justify-center">
            <PhoneCall className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold tracking-wide">ChitChat</h1>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link> */}

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
