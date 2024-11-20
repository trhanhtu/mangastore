import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ toggleDarkMode, darkMode }: { toggleDarkMode: () => void; darkMode: boolean }) => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user avatar and name from localStorage
    setUserAvatar(localStorage.getItem("userAvatar"));
    setUserName(localStorage.getItem("userEmail"));
  }, []);

  return (
    <div className="flex items-center justify-between bg-white px-7 py-3 dark:bg-slate-700 dark:text-gray-300">
      <h1 className="font-bold">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <button 
          className="rounded-md bg-slate-200 dark:bg-slate-600 dark:text-slate-300"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <FaSun className="p-2 text-4xl" />
          ) : (
            <FaMoon className="p-2 text-4xl" />
          )}
        </button>

        <Link to="/profile" className="flex items-center gap-3">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
              {userName ? userName.charAt(0).toUpperCase() : "?"}
            </div>
          )}
          <h2 className="font-medium">{userName || ""}</h2>
        </Link>
      </div>
    </div>
  );
}

export default Header;
