import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaVenusMars,
  FaCalendarDay,
  FaTint,
  FaHandHoldingHeart,
  FaHeart,
  FaMapMarkerAlt,
  FaFileMedical,
  FaBell,
  FaStar,
  FaUserTag,
  FaClock,
  FaCalendarPlus,
  FaCalendarCheck,
  FaShieldAlt,
  FaChevronDown,
  FaIdCard,
  FaPhone,
  FaHome,
  FaSignature,
  FaVenus,
  FaMars,
  FaGenderless,
  FaCalendar,
  FaMarsDouble,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { FaCalendarPlus } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { useAuthStore } from "../../store/useAuthStore";
import moment from "moment";

const Profile = () => {
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gender, setGender] = useState("male");
  const [bloodType, setBloodType] = useState("A+");
  const [dob, setDob] = useState("1990-05-15");

  const navigate = useNavigate();

  const { authUser } = useAuthStore();

  const verificationItems = [
    { icon: <FaIdCard />, text: "ID Verification", status: "verified" },
    { icon: <FaPhone />, text: "Phone Verification", status: "verified" },
    { icon: <FaEnvelope />, text: "Email Verification", status: "verified" },
    {
      icon: <FaFileMedical />,
      text: "Medical Verification",
      status: "pending",
    },
    { icon: <FaHome />, text: "Address Verification", status: "unverified" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "unverified":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending";
      case "unverified":
        return "Not Verified";
      default:
        return "Unknown";
    }
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-100">
          {/* Profile Header */}
          <div className="bg-red-300 py-8 px-6 text-center text-white relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/30"
            />
            <h1 className="text-2xl font-bold mb-1"> {authUser.name} </h1>
            <div className="flex items-center justify-center  gap-2 ">
              <h1 className="inline-block bg-white text-red-600 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                Active Donor
              </h1>
              <h1 className="h-full flex flex-col justify-center items-center gap-2">
                <SlBadge className="size-12 text-red-700" />
                <span
                  className={`p-1 px-2 ${
                    authUser.verified ? "bg-green-400" : "bg-gray-300"
                  } rounded-xl`}
                >
                  {authUser.verified ? "Verified" : "Not Verified"}
                </span>
              </h1>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <FaUser /> Personal Information
                </h2>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaSignature /> Full Name
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2 transition-all duration-200 hover:bg-red-50 hover:text-red-800 cursor-pointer">
                    {authUser.name}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaCalendarDay /> Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaEnvelope /> Email
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2 transition-all duration-200 hover:bg-red-50 hover:text-red-800 cursor-pointer">
                    <FaEnvelope className="text-gray-500" /> {authUser.email}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaVenusMars /> Gender
                  </label>
                  <div className="relative">
                    <select
                      value={authUser.gender}
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <FaTint /> Donation Information
                </h2>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaTint /> Blood Type
                  </label>
                  <div className="relative">
                    <select
                      disabled
                      value={authUser.bloodType}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 cursor-pointer"
                    >
                      {bloodTypes.map((type) => (
                        <option key={type} value={type}>
                           {type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaHandHoldingHeart /> Donated To
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md">
                    {" "}
                    {authUser?.donatedTo?.length} recipients
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaHeart /> Donated By
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md">
                    {authUser?.donatedBy?.length} donors
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaMapMarkerAlt /> Location
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2 transition-all duration-200 hover:bg-red-50 hover:text-red-800 cursor-pointer">
                    <FaMapMarkerAlt className="text-gray-500" /> New Delhi,
                    India
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <FaFileMedical /> Medical History
                </h2>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaFileMedical /> Medical Records
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2 transition-all duration-200 hover:bg-red-50 hover:text-red-800 cursor-pointer">
                    <FaFileMedical className="text-gray-500" /> View History
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaBell /> Notifications
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaBell className="text-gray-500" /> Push Notifications
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() =>
                          setNotificationsEnabled(!notificationsEnabled)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaStar /> Donor Rating
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
                            star <= rating ? "text-red-500" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaUserTag /> Roles
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md">
                    Donor, Volunteer
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <FaClock /> Account Information
                </h2>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaCalendarPlus /> Created At
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2">
                    <FaCalendar className="text-gray-500" />{" "}
                    {moment(authUser.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <FaCalendarCheck /> Last Updated
                  </label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2">
                    <FaCalendar className="text-gray-500" />{" "}
                    {moment(authUser.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Dropdown */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div
                className={`flex items-center justify-between px-4 py-3 bg-red-50 text-red-800 rounded-md font-semibold cursor-pointer transition-all duration-200 ${
                  isVerificationOpen ? "rounded-b-none" : ""
                }`}
                onClick={() => setIsVerificationOpen(!isVerificationOpen)}
              >
                <div className="flex items-center gap-2">
                  <FaShieldAlt /> Account Verification
                </div>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    isVerificationOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`bg-gray-50 rounded-b-md overflow-hidden transition-all duration-300 ${
                  isVerificationOpen
                    ? "max-h-96 border border-t-0 border-gray-200"
                    : "max-h-0"
                }`}
              >
                {verificationItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      index < verificationItems.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">{item.text}</div>
                    <div
                      className={`font-semibold ${getStatusColor(item.status)}`}
                    >
                      {getStatusText(item.status)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="btn rounded-2xl"
                  onClick={() => navigate("/verify-user")}
                >
                  {" "}
                  Verify Remaining{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
