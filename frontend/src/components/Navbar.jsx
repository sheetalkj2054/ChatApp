import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-40 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="text-primary" />
          </div>
          <h1 className="text-lg font-bold">Chatty</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/settings" className="btn btn-sm gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="btn btn-sm gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button onClick={logout} className="btn btn-sm gap-2">
                <LogOut size={16} />
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
