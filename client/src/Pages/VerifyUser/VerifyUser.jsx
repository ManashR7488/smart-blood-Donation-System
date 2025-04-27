import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const VerifyUser = () => {
  // State for Aadhaar verification
  const { authUser, verifyotp } = useAuthStore();

  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  // State for face verification
  const [cameraStarted, setCameraStarted] = useState(false);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);

  // State for contact verification
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState('');

  // Progress tracking
  const [progress, setProgress] = useState(25);

  // Refs for video elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle Aadhaar front upload
  const handleAadhaarFront = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadhaarFront(URL.createObjectURL(file));
    }
  };

  // Handle Aadhaar back upload
  const handleAadhaarBack = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadhaarBack(URL.createObjectURL(file));
    }
  };

  // Verify Aadhaar
  const verifyAadhaar = () => {
    // Simulate verification
    setTimeout(() => {
      setAadhaarVerified(true);
      setProgress(50);
    }, 1500);
  };

  // Start camera for face verification
  const startCamera = () => {
    setCameraStarted(true);
    // In a real app, you would access the webcam here
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  };

  // Capture face
  const captureFace = () => {
    setFaceCaptured(true);
    // In a real app, you would capture the image from the video stream
  };

  // Verify face
  const verifyFace = () => {
    // Simulate verification
    setTimeout(() => {
      setFaceVerified(true);
      setProgress(75);
    }, 1000);
  };

  // Send OTP
  const sendOtp = async () => {
    await verifyotp({
      userId: authUser._id,
      phoneNumber: `+91${mobileNumber}`,
    });
    setOtpSent(true);
  };

  // Verify mobile
  const verifyMobile = async() => {
    // Simulate verification
    await verifyotp({
      userId: authUser._id,
      phoneNumber: `+91${mobileNumber}`,
      otp: otp,
    });
    setProgress(100);
    
  };

  // Send email verification
  const sendEmailVerification = () => {
    if (email) {
      // Simulate verification
      setTimeout(() => {
        setEmailVerified(true);
      }, 1500);
    }
  };

  // Handle OTP input
  // const handleOtpChange = (index, value) => {
  //   if (value.length <= 1 && !isNaN(value)) {
  //     const newOtp = [...otp];
  //     newOtp[index] = value;
  //     setOtp(newOtp);

  //     // Auto focus next input
  //     if (value && index < 5) {
  //       document.getElementById(otp - `${index + 1}`).focus();
  //     }
  //   }
  // };

  // Handle OTP backspace
  // const handleOtpKeyDown = (index, e) => {
  //   if (e.key === "Backspace" && !otp[index] && index > 0) {
  //     document.getElementById(otp - `${index - 1}`).focus();
  //   }
  // };

  // Update progress steps
  useEffect(() => {
    const steps = document.querySelectorAll(".verification-step");
    steps.forEach((step, index) => {
      const icon = step.querySelector(".step-icon");
      if (progress >= (index + 1) * 25) {
        icon.classList.remove("bg-gray-200", "text-gray-600");
        icon.classList.add("bg-red-600", "text-white");
      }
    });
  }, [progress]);

  const otpDigits = otp.split("").concat(Array(6).fill("")).slice(0, 6);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // only 0–9 or empty
    const chars = otp.split("");
    chars[index] = value; // replace at position
    // build new string out to the last entered digit
    const newOtp = chars.join("");
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // const verifyMobile = async () => {
  //   if (otp.length < 6) {
  //     setError("Please enter all 6 digits");
  //     return;
  //   }
  //   setError("");
  //   try {
  //     await axios.post("/api/auth/otp", { userId, otp });
  //     alert("✅ Phone verified!");
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Verification Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          <span className="text-red-600">Identity Verification</span> Process
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete these verification steps to ensure the safety and
          authenticity of our donor community.
        </p>
      </div>

      {/* Verification Progress */}
      <div className="flex justify-between items-center mb-8 px-8">
        <div className="relative w-full">
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              id="verificationProgress"
              className="h-1 bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="verification-step flex flex-col items-center relative">
              <div className="step-icon w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">
                Basic Info
              </span>
            </div>
            <div className="verification-step flex flex-col items-center relative">
              <div className="step-icon w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 010-2h10V6H6a1 1 0 00-1 1v11H4V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">Aadhaar</span>
            </div>
            <div className="verification-step flex flex-col items-center relative">
              <div className="step-icon w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">
                Face Match
              </span>
            </div>
            <div className="verification-step flex flex-col items-center relative">
              <div className="step-icon w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">
                OTP Verify
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Cards Container */}
      <div className="space-y-6">
        {/* Aadhaar Verification Card */}
        <div
          id="aadhaarCard"
          className={`verification-card rounded-xl border border-gray-200 p-6 transition-all duration-400 ${
            aadhaarVerified ? "active border-l-4 border-red-500" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 010-2h10V6H6a1 1 0 00-1 1v11H4V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Aadhaar Card Verification
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Upload your Aadhaar card for identity verification
                </p>

                <div className="mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      id="aadhaarFront"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleAadhaarFront}
                    />
                    <label
                      htmlFor="aadhaarFront"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Front Side
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      id="aadhaarBack"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleAadhaarBack}
                    />
                    <label
                      htmlFor="aadhaarBack"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Back Side
                    </label>
                  </div>
                </div>

                {(aadhaarFront || aadhaarBack) && (
                  <div id="aadhaarPreview" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aadhaarFront && (
                        <div className="border rounded-lg p-2">
                          <img
                            src={aadhaarFront}
                            className="w-full h-auto rounded"
                            alt="Aadhaar Front"
                          />
                          <p className="text-xs text-center mt-1 text-gray-500">
                            Front Preview
                          </p>
                        </div>
                      )}
                      {aadhaarBack && (
                        <div className="border rounded-lg p-2">
                          <img
                            src={aadhaarBack}
                            className="w-full h-auto rounded"
                            alt="Aadhaar Back"
                          />
                          <p className="text-xs text-center mt-1 text-gray-500">
                            Back Preview
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={verifyAadhaar}
                      className="mt-4 w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Verify Aadhaar
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div id="aadhaarStatus">
              {aadhaarVerified ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Face Verification Card */}
        <div
          id="faceCard"
          className={`verification-card rounded-xl border border-gray-200 p-6 transition-all duration-400 ${
            faceVerified ? "active border-l-4 border-red-500" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Face Recognition
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Verify your identity with facial recognition
                </p>

                <div className="mt-4">
                  <div
                    className="webcam-container rounded-lg overflow-hidden relative"
                    style={{ maxWidth: "500px" }}
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                      <video
                        id="webcam"
                        autoPlay
                        playsInline
                        className="w-full h-auto"
                        ref={videoRef}
                        style={{ display: cameraStarted ? "block" : "none" }}
                      ></video>
                      <canvas
                        id="faceCanvas"
                        className="absolute inset-0 w-full h-full"
                        ref={canvasRef}
                      ></canvas>
                      {cameraStarted && !faceCaptured && (
                        <div
                          className="face-outline absolute border-2 border-red-500 rounded-full"
                          style={{
                            width: "200px",
                            height: "250px",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        ></div>
                      )}
                    </div>
                    <div className="mt-3 flex space-x-3">
                      {!cameraStarted ? (
                        <button
                          onClick={startCamera}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Start Camera
                        </button>
                      ) : !faceCaptured ? (
                        <button
                          onClick={captureFace}
                          className="px-4 py-2 bg-white border border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                        >
                          Capture Photo
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {faceCaptured && (
                    <div id="faceCapturePreview" className="mt-4">
                      <div className="flex items-center space-x-4">
                        <div className="border rounded-lg p-2">
                          <img
                            id="capturedFace"
                            src="https://via.placeholder.com/128" // Replace with actual captured face
                            className="w-32 h-32 object-cover rounded"
                            alt="Captured Face"
                          />
                          <p className="text-xs text-center mt-1 text-gray-500">
                            Your Photo
                          </p>
                        </div>
                        <div className="border rounded-lg p-2">
                          <img
                            id="aadhaarFace"
                            src="https://via.placeholder.com/128" // Replace with Aadhaar face
                            className="w-32 h-32 object-cover rounded"
                            alt="Aadhaar Photo"
                          />
                          <p className="text-xs text-center mt-1 text-gray-500">
                            Aadhaar Photo
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">
                            Face matching score:{" "}
                            <span id="faceMatchScore" className="font-semibold">
                              87%
                            </span>
                          </span>
                        </div>
                        <button
                          onClick={verifyFace}
                          className="mt-3 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Confirm Identity
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div id="faceStatus">
              {faceVerified ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Contact Verification Card */}
        <div
          id="contactCard"
          className={`verification-card rounded-xl border border-gray-200 p-6 transition-all duration-400 ${
            mobileVerified ? "active border-l-4 border-red-500" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  Contact Verification
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Verify your mobile number and email address
                </p>

                <div className="mt-4 space-y-4">
                  {/* Mobile Verification */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="font-medium">Mobile Number</span>
                      </div>
                      <span
                        id="mobileStatus"
                        className={`text-xs px-2 py-1 rounded ${
                          mobileVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {mobileVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="tel"
                        id="mobileNumber"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="+91 9876543210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <button
                        onClick={sendOtp}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                      >
                        {otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    </div>

                    {otpSent && (
                      <div id="otpContainer" className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">
                          Enter 6-digit OTP sent to your mobile
                        </p>
                        <div className="flex space-x-2">
                          {otpDigits.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit || ""}
                              onChange={(e) =>
                                handleOtpChange(i, e.target.value)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(i, e)}
                              className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          ))}
                        </div>

                        <button
                          onClick={verifyMobile}
                          className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                        >
                          Verify Mobile
                        </button>

                        {error && (
                          <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                          Didn't receive OTP?{" "}
                          <button className="text-red-600 hover:underline">
                            Resend
                          </button>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Email Verification */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="font-medium">Email Address</span>
                      </div>
                      <span
                        id="emailStatus"
                        className={`text-xs px-2 py-1 rounded ${
                          emailVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {emailVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="email"
                        id="emailAddress"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        onClick={sendEmailVerification}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Send Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="contactStatus">
              {mobileVerified ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Verification Button */}
      <div className="mt-8 text-center">
        <button
          id="completeVerificationBtn"
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            progress === 100
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={progress !== 100}
        >
          Complete Verification
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;
