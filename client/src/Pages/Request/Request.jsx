// src/components/Request.jsx
import React, { useState } from 'react';

const Request = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    e.target.reset();
  };

  const handleInvalid = (e) => {
    e.target.classList.add('animate-shake');
    setTimeout(() => e.target.classList.remove('animate-shake'), 500);
  };

  return (
    <div className="min-h-screen w-full z-[0] flex items-center justify-center p-6 font-sans bg-white animate-fadein">
      <div className="w-full max-w-2xl">
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-[#171111] mb-2">Blood Request Form</h1>
          <p className="text-[#886463]">Please fill in all required details</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Name */}
          <div className="relative">
              <label className="floating-label">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              placeholder=" "
              required
              onInvalid={handleInvalid}
              className="form-input w-full h-14 px-4 bg-[#f4f0f0] rounded-xl placeholder:text-[#876464] focus:outline-none focus:bg-[#fff0f0] focus:ring-2 focus:ring-[#df2020] transition-all"
            />
          </div>

          {/* Recipient Age */}
          <div className="relative">
              <label className="floating-label">Recipient Age</label>
            <input
              type="number"
              name="age"
              placeholder=" "
              required
              onInvalid={handleInvalid}
              className="form-input w-full h-14 px-4 bg-[#f4f0f0] rounded-xl placeholder:text-[#876464] focus:outline-none focus:bg-[#fff0f0] focus:ring-2 focus:ring-[#df2020] transition-all"
            />
          </div>

          {/* Blood Type */}
          <div className="relative">
              <label className="floating-label">Blood Type</label>
            <select
              name="bloodType"
              required
              onInvalid={handleInvalid}
              className="form-input w-full h-14 px-4 bg-[#f4f0f0] rounded-xl appearance-none focus:outline-none focus:bg-[#fff0f0] focus:ring-2 focus:ring-[#df2020] transition-all"
            >
              <option value=""> </option>
              <option>A+</option>
              <option>B+</option>
              <option>O+</option>
              <option>AB+</option>
              <option>AB+</option>
              <option>AB+</option>
              <option>AB+</option>
              <option>AB+</option>
              <option>AB+</option>
              <option>AB+</option>
            </select>
          </div>

          {/* Hospital Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
                <label className="floating-label">Hospital Name</label>
              <input
                type="text"
                name="hospital"
                placeholder=" "
                required
                onInvalid={handleInvalid}
                className="form-input w-full h-14 px-4 bg-[#f4f0f0] rounded-xl placeholder:text-[#876464] focus:outline-none focus:bg-[#fff0f0] focus:ring-2 focus:ring-[#df2020] transition-all"
              />
            </div>
            <div className="relative">
                <label className="floating-label">Units Required</label>
              <input
                type="number"
                name="units"
                placeholder=" "
                required
                onInvalid={handleInvalid}
                className="form-input w-full h-14 px-4 bg-[#f4f0f0] rounded-xl placeholder:text-[#876464] focus:outline-none focus:bg-[#fff0f0] focus:ring-2 focus:ring-[#df2020] transition-all"
              />
            </div>
          </div>

          {/* Hospital Address */}
          <div className="relative">
              <label className="floating-label">Hospital Address</label>
            <textarea
              name="address"
              placeholder=" "
              required
              onInvalid={handleInvalid}
              className="form-input w-full min-h-[140px] px-4 py-4 bg-[#f4f0f0] rounded-xl placeholder:text-[#876464] focus:outline-none focus:bg-[#fff0f0] focus:ring-2 focus:ring-[#df2020] transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="hover-scale button-press w-full h-12 bg-[#df2020] text-white rounded-xl font-bold transition-transform relative"
          >
            {!loading && <span className="submit-text">Submit Request</span>}
            {loading && (
              <div className="spinner absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></div>
              </div>
            )}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="fixed top-4 right-4 px-6 py-3 bg-green-500 text-white rounded-lg animate-fadein">
            Request submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
