import React from 'react';
import { IoNotifications } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  

  return (
    <div className="bg-white shadow-md p-2 fixed top-0 left-0 w-full z-50 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Logo" className="h-8" />
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Explore</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Create</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="px-4 py-2 border border-gray-300 rounded-full" />
        <div className="relative">
          <IoNotifications className="text-[24px]"/>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <Link to="/profile"><img src="https://images.unsplash.com/photo-1653389525308-e7ab9fc0c260?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2VzfGVufDB8fDB8fHww" alt="Profile" className="h-8 rounded-full" /></Link>
      </div>
    </div>
  );
};

export default Navbar;
