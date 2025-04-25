// src/components/Donate.jsx
import React, { useState } from "react";
import {
  FaHandHoldingHeart,
  FaUserTag,
  FaTint,
  FaHeartbeat,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const states = ["Odisha", "Maharashtra", "Delhi", "Karnataka", "West Bengal"];

const Donate = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    e.target.reset();
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-full flex-1  bg-gradient-to-b from-red-400 to-red-600 p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white bg-opacity-90 rounded-2xl shadow-xl backdrop-blur-md transform transition-all duration-500 translate-y-5 animate-slide-up"
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center bg-red-500 text-black rounded-xl p-6 mb-6">
            <FaHandHoldingHeart className="mx-auto text-4xl" />
            <h1 className="text-2xl font-semibold mt-2">
              Join Blood Donor Network
            </h1>
            <p className="mt-1 text-red-100">
              One donation can save multiple lives
            </p>
          </div>
          {/* Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 transform transition">
              <h3 className="flex items-center text-xl font-medium mb-2">
                <FaUserTag className="mr-2 text-red-500" /> Personal Details
              </h3>
              <p>
                <span className="font-semibold">Name:</span> Sumit Mukharjee
              </p>
              <p>
                <span className="font-semibold">Age:</span> 28 Years
              </p>
              <p>
                <span className="font-semibold">Location:</span> Odisha
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 transform transition">
              <h3 className="flex items-center text-xl font-medium mb-2">
                <FaTint className="mr-2 text-red-500" /> Medical Info
              </h3>
              <p>
                <span className="font-semibold">Blood Group:</span> O+
              </p>
              <p>
                <span className="font-semibold">Last Donation:</span> 15 Jan
                2024
              </p>
              <p>
                <span className="font-semibold">Weight:</span> 68 kg
              </p>
            </div>
          </div>
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Preferred Donation State
              </label>
              <select
                required
                className="w-full border-2 border-red-100 rounded-lg p-3 focus:border-red-500 transition"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Terms & Conditions</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Age 18-65 years</li>
                <li>Weight &gt;45 kg</li>
                <li>No recent tattoos/piercings</li>
                <li>No alcohol in 24hrs</li>
              </ul>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  className="form-checkbox h-5 w-5 text-red-500"
                />
                <span className="text-gray-700">I accept all terms</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white rounded-lg py-3 text-lg font-semibold hover:bg-red-600 transform hover:-translate-y-1 transition"
            >
              <FaHeartbeat className="inline mr-2" /> Register Now
            </button>
          </form>
        </div>
      </motion.div>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 text-center space-y-4">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
            <h2 className="text-2xl font-semibold">Successfully Submitted!</h2>
            <p>Thank you for registering as a blood donor.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
