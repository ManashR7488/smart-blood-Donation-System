

import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LuUserRound } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

const Signup = () => {
  const { isSigningUp, signup } = useAuthStore();

  const [isView1, setIsView1] = useState(false);
  const [isView2, setIsView2] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    conPassword: "",
    latitude: null,
    longitude: null,
  });
  const [validClass, setValidClass] = useState("");
  const passLeble = useRef(null);

  useEffect(() => {
    if (
      formData.password === formData.conPassword &&
      formData.password.length > 0
    ) {
      setValidClass("border-green-500");
    } else if (
      formData.conPassword.length > 1 &&
      formData.password !== formData.conPassword
    ) {
      setValidClass("border-red-500");
    } else {
      setValidClass("");
    }
  }, [formData]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const handdleSubmit = async (e)=>{
    e.preventDefault();
    await signup({
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
      longitude: formData.longitude,
      latitude: formData.latitude,
      gender: "male",
      bloodType: "O+",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <form onSubmit={handdleSubmit}>
        <div className="flex flex-col items-center justify-center  w-96 gap-2 py-4 shadow-2xl rounded-md">
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="font-semibold textarea-lg">Create Account</p>
            <p className="text-sm">Please sign up to book appointment</p>
          </div>
          <div className="form flex flex-col items-center gap-4 py-5 text-left w-full">
            
            
            
            
            <div className="w-4/5">
              <label className="input validator w-full">
                <LuUserRound className="opacity-50" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </label>
            </div>
            
            <div className="w-4/5">
              <label className="input validator w-full">
                <IoMailOutline className="opacity-50" />
                <input
                  type="email"
                  placeholder="Type Email"
                  required
                  className="w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div className="w-4/5">
              <label className="input validator pr-0  w-full" ref={passLeble}>
                <RiLockPasswordLine className="opacity-50" />
                <input
                  type={isView1 ? "test" : "password"}
                  required
                  placeholder="Password"
                  minLength="6"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="btn h-full w-fit px-2 bg-transparent border-none cursor-pointer"
                  onClick={() => setIsView1(!isView1)}
                >
                  {" "}
                  {isView1 ? (
                    <FiEye className="size-4 opacity-60" />
                  ) : (
                    <FiEyeOff className="size-4 opacity-60" />
                  )}{" "}
                </button>
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </div>
            <div className="w-4/5">
              <label className={`input pr-0  w-full ${validClass} `}>
                <RiLockPasswordLine className="opacity-50" />
                <input
                  type={isView2 ? "test" : "password"}
                  required
                  placeholder="Password"
                  className=""
                  value={formData.conPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, conPassword: e.target.value });
                  }}
                />
                <button
                  className="btn h-full w-fit px-2 bg-transparent border-none "
                  onClick={() => setIsView2(!isView2)}
                >
                  {" "}
                  {isView2 ? (
                    <FiEye className="size-4 opacity-60" />
                  ) : (
                    <FiEyeOff className="size-4 opacity-60" />
                  )}{" "}
                </button>
              </label>
            </div>
          </div>
          <button className="submit btn w-3/5">
            {isSigningUp ? (
              <CgSpinner className="animate-spin text-2xl duration-150" />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
