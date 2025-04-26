import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Request from "./Pages/Request/Request";
import Donate from "./components/Donate/Donate";
import MedGenAIChat from "./components/AiChatBot/MedGenAI";
import Profile from "./Pages/Profile/Profile";
import VerifyUser from "./Pages/VerifyUser/VerifyUser";
import { useAuthStore } from './store/useAuthStore';

const App = () => {

  const {checkAuth } = useAuthStore();

useEffect(() => {
    console.log(import.meta.env.MODE)
    checkAuth();
}, [])


  return (
    <div className=" relative flex justify-start items-start" data-theme="light">
      <MedGenAIChat />
      <Nav />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Request />} />
          <Route path="/signup" element={<Request />} />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route path="/request" element={<Request />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/verify-user" element={<VerifyUser />} />
          <Route
            path="/contact"
            element={<h1 className="text-3xl font-bold underline">Contact</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
