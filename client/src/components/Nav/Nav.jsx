// src/components/Nav.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiHome,
  HiCalendar,
  HiLocationMarker,
  HiUser,
  HiPlusCircle,
} from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "/images/logo.png";
import { useAuthStore } from "../../store/useAuthStore";
import { PiHandCoinsBold } from "react-icons/pi";

const links = [
  { name: "Home", to: "/", end: true, icon: <HiHome className="h-5 w-5" /> },
  
  {
    name: "Find Centers",
    to: "/findcenters",
    icon: <HiLocationMarker className="h-5 w-5" />,
  },
  
  {
    name: "Request Blood",
    to: "/request",
    icon: <HiPlusCircle className="h-5 w-5" />,
  },
  {
    name: "Scheduled Donations",
    to: "/scheduled",
    icon: <HiCalendar className="h-5 w-5" />,
  },{
    name:"Credit", to:"/credit", icon:<PiHandCoinsBold className="h-5 w-5" />
  },
  { name: "My Profile", to: "/profile", icon: <HiUser className="h-5 w-5" /> },
];

const Nav = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <nav className="sticky top-0 left-0 h-screen flex flex-col justify-between items-center w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <NavLink to="/" end className="flex items-center space-x-2 mb-8">
          <img src={logo} alt="" className="h-10 object-cover" />
          <span className="text-xl font-bold text-gray-900">Blood Buddy</span>
        </NavLink>

        <ul className="space-y-4">
          {links.map((link, idx) => (
            <li key={idx}>
              <NavLink to={link.to} end={link.end}>
                {({ isActive }) => (
                  <div
                    className={`${
                      isActive ? "bg-red-50" : "hover:bg-red-50"
                    } flex items-center space-x-3 p-3 rounded transition-colors relative`}
                  >
                    {link.icon}
                    <span className="flex-1 text-gray-600 text-nowrap">
                      {link.name}
                    </span>
                    {isActive && (
                      <span className="absolute right-0 top-0 h-full w-1 bg-red-600 rounded-tr rounded-br" />
                    )}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 flex flex-col items-center space-x-4 gap-4 ">
        <div className="flex space-x-4 ">
          {authUser ? (
            <button
            onClick={()=> logout()}
            className="px-15 py-2 border border-base-300 bg-red-400  rounded-full w-full"
          >
            Logout
          </button>
          ) : (
            <div>
              <Link
                to="/register"
                className="px-4 py-2 border border-base-300 bg-red-400  rounded-full"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 border border-base-300 rounded-full"
              >
                Login
              </Link>
            </div>
          )}
        </div>
        <button className="btn p-4 rounded-full" onClick={()=>navigate("/settings")}>
          <IoSettingsOutline />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
