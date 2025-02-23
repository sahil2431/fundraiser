import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, ChevronDown, LogOut } from "lucide-react";
import { logout } from "../features/authSlice";

const Navbar = ({ openSidebar }) => {
  const { user } = useSelector((state) => state.authUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <div className="w-[100vw] h-16 flex justify-between p-3 items-center fixed top-0 left-0 z-10 bg-white">
      <div className="flex items-center gap-3">
        <Menu size={24} onClick={openSidebar} />
        <div className="ml-7 flex items-center justify-center h-16 border-b">
          <div className="text-2xl font-bold text-blue-500 border border-blue-400 px-4 py-1 rounded">
            Logo
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center mr-5 relative" ref={dropdownRef}>
        <img className="rounded-full h-7" src={user?.photoURL} alt="profile" />
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-500 focus:outline-none"
        >
          <span>{user?.displayName}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-20 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-100 rounded-t-lg"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
