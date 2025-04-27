import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaHeart,
  FaCheck,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonSuccess, setButtonSuccess] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      size: Math.random() > 0.5 ? "small" : "medium",
      left: `${Math.random() * 100}%`,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
    setBubbles(generatedBubbles);
  }, []);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setButtonSuccess(isLoggingIn);
      login({ email, password });
      setButtonSuccess(isLoggingIn);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-rose-50 overflow-hidden p-4">
      {/* Bubbles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full ${
              bubble.size === "small" ? "w-8 h-8" : "w-12 h-12 "
            } flex items-center justify-center`}
            style={{ left: bubble.left }}
            animate={{ y: ["-10vh", "100vh"], scale: [1, 0] }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaDroplet
              className="text-rose-200"
              size={bubble.size === "small" ? 24 : 30}
            />
          </motion.div>
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <div className="text-center mb-8">
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl font-bold text-rose-600 mb-2"
            >
              Blood Buddy
            </motion.h1>
            <p className="text-gray-600">Join the lifesaving community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative"
            >
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-rose-100 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-300"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 bg-white px-2 transition-all ${
                  email ? "top-[-3px] text-sm text-rose-600" : ""
                }`}
              >
                Email Address
              </label>
              <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-300 w-6 h-6" />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="relative"
            >
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-rose-100 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-300"
              />
              <label
                htmlFor="password"
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 bg-white px-2 transition-all ${
                  password ? "top-[-3px] text-sm text-rose-600" : ""
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </motion.div>

            {/* Options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-between items-center mt-4"
            >
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-500"
                />
                Remember me
              </label>
              <a href="#" className="text-rose-600 hover:text-rose-800 text-sm">
                Forgot Password?
              </a>
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full mt-8 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 relative overflow-hidden transition ${
                buttonSuccess ? "bg-green-500" : "bg-rose-600 hover:bg-rose-700"
              } text-white shadow-lg`}
            >
              {buttonSuccess ? (
                <>
                  <FaCheck className="animate-spin" /> Success!
                </>
              ) : (
                <>
                  <span className="button-text">Login Now</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    className="absolute inset-0 bg-rose-700/10 rounded-xl"
                  />
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                  >
                    <FaHeart />
                  </motion.span>
                  <FaArrowRight />
                </>
              )}
            </motion.button>

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center text-gray-600 mt-6"
            >
              New to Blood Buddy?{" "}
              <Link
                to={"/register"}
                className="text-rose-600 font-semibold hover:text-rose-800"
              >
                Create Account
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
