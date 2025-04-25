import { useState, useRef } from "react";
import { RiUpload2Fill } from "react-icons/ri";

export default function AadhaarVerification() {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const simulateOCR = () => {
    if (!image) return;

    setIsScanning(true);
    setExtractedData(null);
    setOtp(null);
    setOtpSent(false);
    setVerificationStatus("pending");

    setTimeout(() => {
      setIsScanning(false);
      setExtractedData({
        aadhaarNumber: "1234 5678 9012",
        mobileNumber: "9876543210",
      });
    }, 3000);
  };

  const sendOTP = () => {
    if (!extractedData) return;

    setOtpSent(true);
    setTimeout(() => {
      setOtp("123456");
    }, 1000);
  };

  const verifyOTP = (enteredOtp) => {
    if (otp && enteredOtp === otp) {
      setVerificationStatus("success");
    } else {
      setVerificationStatus("failed");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 text-center">
            <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Aadhaar Smart Verification
            </h1>
            <p className="text-gray-600 text-sm">
              Upload your Aadhaar card image for verification
            </p>
          </div>
          <div className="p-6">
            {!image ? (
              <div className="space-y-4">
                <label
                  htmlFor="aadhaar-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <RiUpload2Fill />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      Aadhaar Card Image (JPG, PNG)
                    </p>
                  </div>
                  <input
                    id="aadhaar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt="Uploaded Aadhaar"
                      className="w-full h-auto"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="w-64 h-1 bg-blue-400 mb-2 rounded-full"></div>
                          <p className="text-white font-medium">
                            Scanning Aadhaar Card...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!isScanning && !extractedData && (
                  <div className="flex space-x-4">
                    <button
                      onClick={simulateOCR}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs text-white py-2 px-4 rounded-md transition"
                    >
                      Send OTP to your registered mobile number
                    </button>
                  </div>
                )}

                {extractedData && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Extracted Details</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <svg
                            className="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">
                              Aadhaar Number
                            </p>
                            <p className="font-medium">
                              {extractedData.aadhaarNumber}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <svg
                            className="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">
                              Mobile Number
                            </p>
                            <p className="font-medium">
                              {extractedData.mobileNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!otpSent ? (
                      <button
                        onClick={sendOTP}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
                      >
                        Send OTP to Mobile
                      </button>
                    ) : (
                      <div className="space-y-4">
                        {otp ? (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">
                                OTP sent to {extractedData.mobileNumber}
                              </p>
                              <p className="mt-2 font-medium">
                                Your OTP is:{" "}
                                <span className="text-blue-600">{otp}</span>
                              </p>
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Enter OTP
                              </label>
                              <input
                                id="otp"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                onChange={(e) => verifyOTP(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            {verificationStatus === "success" && (
                              <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center">
                                <p className="font-medium">
                                  Verification Successful!
                                </p>
                                <p className="text-sm">
                                  Aadhaar details verified successfully.
                                </p>
                              </div>
                            )}
                            {verificationStatus === "failed" && (
                              <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center">
                                <p className="font-medium">
                                  Verification Failed
                                </p>
                                <p className="text-sm">
                                  Incorrect OTP entered.
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-600">Sending OTP...</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
