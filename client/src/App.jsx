import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Request from "./Pages/Request/Request";
import Donate from "./components/Donate/Donate";
import MedGenAIChat from "./components/AiChatBot/MedGenAI";
import Profile from "./Pages/Profile/Profile";
import VerifyUser from "./Pages/VerifyUser/VerifyUser";
import { useAuthStore } from "./store/useAuthStore";
import Signup from "./Pages/Auth/Signup";
import { Toaster } from "react-hot-toast";
import Test from "./components/test";
import Login from "./Pages/Auth/Login";
import Cradit from "./Pages/Cradit/Cradit";
import FindCenter from "./Pages/FindCenter/FindCenter";
import Scheduled from "./Pages/Scheduled/Scheduled";
import Settings from "./Pages/Settings/Settings"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div
      className=" relative flex justify-start items-start"
      data-theme="light"
    >
      {authUser && <MedGenAIChat />}
      <Nav />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!authUser ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/request"
            element={authUser ? <Request /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/donate"
            element={authUser ? <Donate /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/verify-user"
            element={authUser ? <VerifyUser /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/scheduled"
            element={authUser ? <Scheduled /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/settings"
            element={authUser ? <Settings /> : <Navigate to={"/login"} />}
          />
          <Route path="/credit" element={ authUser ? <Cradit /> : <Navigate to={"/login"} /> } />
          <Route path="/findcenters" element={ authUser ? <FindCenter /> : <Navigate to={"/login"} /> } />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
