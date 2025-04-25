import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    contact: "",
    address: "",
    city: "",
    state: "Odisha",
    bloodType: "O+",
    lastDonation: "",
    weight: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "", target: "" });
  const [loadingAadhaar, setLoadingAadhaar] = useState(false);
  const inputRefs = useRef([]);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("donorData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
    }
  }, []);

  

  const sendOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOTP(generatedOTP);
    setAttempts(0);
    showStatus(
      `OTP sent to 9876543210 (Simulated: ${generatedOTP})`,
      "success",
      "otp"
    );
  };

  

  const showStatus = (message, type, target) => {
    setStatus({ message, type, target });
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("donorData", JSON.stringify(formData));
    showStatus("Registration Successful! Redirecting...", "success", "otp");
    setTimeout(() => {
      window.location.href = "/confirmation";
    }, 2000);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-6">
        <div
          className="w-48 h-48 rounded-full bg-gray-100 mx-auto border-2 border-dashed border-neutral-400 overflow-hidden cursor-pointer"
          onClick={() => document.getElementById("profileInput").click()}
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23886363' viewBox='0 0 24 24'%3E%3Cpath d='M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l2.5-3.21 1.79 2.15 2.5-3.22L17 19H5z'/%3E%3C/svg%3E"
              alt="Upload"
            />
          )}
        </div>
        <input
          type="file"
          id="profileInput"
          accept="image/*"
          hidden
          onChange={(e) =>
            setProfilePhoto(URL.createObjectURL(e.target.files[0]))
          }
        />
        <p className="mt-2 text-sm text-gray-600">
          Click to upload profile photo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          {/* {['fullName', 'dob', 'contact', 'address', 'city', 'weight'].map((field, idx) => (
            <div className="mb-4" key={idx}>
              <label className="block font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                id={field}
                type={field === 'dob' ? 'date' : field === 'weight' ? 'number' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                readOnly={field === 'contact'}
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>
          ))} */}
        
          <div className="mb-4">
            <label className="block font-medium mb-1 capitalize">
              FullName
            </label>
            <input
              id={"fullName"}
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 capitalize">
              dob
            </label>
            <input
              id={"dob"}
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 capitalize">
              contact
            </label>
            <input
              id={"contact"}
              type="number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 capitalize">
              address
            </label>
            <input
              id={"address"}
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 capitalize">
              city
            </label>
            <input
              id={"city"}
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 capitalize">
              weight
            </label>
            <input
              id={"weight"}
              type="text"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">State</label>
              <select
                id="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg"
              >
                {["Odisha", "West Bengal", "Maharashtra", "Karnataka"].map(
                  (state) => (
                    <option key={state}>{state}</option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Medical Information</h2>
          <div className="mb-4">
            <label className="block font-medium mb-1">Blood Type</label>
            <select
              id="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            >
              {["O+", "A+", "B+", "AB+"].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Last Donation Date</label>
            <input
              type="date"
              id="lastDonation"
              value={formData.lastDonation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div
            className="border-2 border-dashed border-gray-400 rounded-xl p-4 text-center cursor-pointer"
            onClick={() => navigate("/verify-user")}
            disabled={true}

          >
            <p>Upload Aadhaar Card (PDF/Image)</p>
            <small>Max file size: 2MB</small>
            {loadingAadhaar && (
              <div className="mt-2 w-8 h-8 border-4 border-t-red-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
            )}
            {status.target === "aadhaar" && (
              <p
                className={`mt-2 text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            )}
            <input
              type="file"
              id="aadhaarInput"
              hidden
              accept=".pdf,.jpg,.png"
              
            />
          </div>

          
        </div>
      </div>

      <button
        className="bg-red-600 text-white px-8 py-3 rounded-xl mt-6 mx-auto block disabled:opacity-50"
        disabled={!verified}
        onClick={handleSubmit}
      >
        Complete Registration
      </button>
    </motion.div>
  );
};

export default Profile;
