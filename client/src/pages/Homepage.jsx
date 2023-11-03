import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

function Homepage() {
  const {userData, userInit} = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    userInit(null);
  }

  useEffect(() => {
    if(!userData) {
      navigate('/register');
    }

  },[userData])
  
  return (
    <div className="h-screen w-full bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="text-2xl">
          <h1 className="text-white text-2xl">Hi</h1>
        </div>
        <div>
        <button 
          type="submit" 
          className="w-full bg-sky-400 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-xs rounded-xs text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-80"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  )
}
export default Homepage