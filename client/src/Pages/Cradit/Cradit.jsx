import React from "react";
import { motion } from "framer-motion";
// import './TopDonors.css';
import { GiTwoCoins } from "react-icons/gi";

const donors = [
  {
    rank: 1,
    name: "Ananya Roy",
    bloodType: "A+",
    lastDonated: "2 weeks ago",
    donationsThisYear: 12,
  },
  {
    rank: 2,
    name: "Rohan Mehra",
    bloodType: "O-",
    lastDonated: "3 weeks ago",
    donationsThisYear: 9,
  },
  {
    rank: 3,
    name: "Priya Desai",
    bloodType: "B+",
    lastDonated: "1 month ago",
    donationsThisYear: 7,
  },
  {
    rank: 4,
    name: "Arjun Kapoor",
    bloodType: "AB+",
    lastDonated: "6 weeks ago",
    donationsThisYear: 6,
  },
  {
    rank: 5,
    name: "Neha Sharma",
    bloodType: "O+",
    lastDonated: "2 months ago",
    donationsThisYear: 5,
  },
];

const Credit = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-5 bg-white">
      <div className="w-full ">
        <div className="w-full py-1 rounded-full flex items-center justify-between">
          <div></div>
          <div className="flex items-center justify-center px-4 py-2 gap-2 rounded-full border">
            <GiTwoCoins className="size-6 text-yellow-300 shadow-2xl" />
            <h1>68</h1>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 badge-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 ml-3">
            Heroes of the Year
          </h2>
        </div>
        <p className="text-gray-600 mt-2">
          Our most dedicated blood donors who saved countless lives
        </p>
      </div>

      {/* Scrollable Donors */}
      <div className="scroll-container overflow-x-auto pb-4">
        <div className="inline-flex space-x-6 min-w-max w-full px-4">
          {donors.map((d) => (
            <motion.div
              key={d.rank}
              className="donor-card w-72 flex-shrink-0 rounded-xl p-6 border border-red-100 shadow-sm"
              initial={{ backgroundPosition: "100% 100%" }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(239,68,68,0.2)",
                backgroundPosition: "0% 0%",
              }}
              transition={{ duration: 0.3 }}
              style={{
                background:
                  "linear-gradient(135deg, #fff 0%, #fff 50%, #fee2e2 100%)",
                backgroundSize: "200% 200%",
              }}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-red-600">
                    {d.rank}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {d.name}
                  </h3>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      {d.bloodType}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Last donated: {d.lastDonated}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {d.donationsThisYear} donations this year
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-white text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors duration-300">
          View All Top Donors →
        </button>
      </div>
    </div>
  );
};

export default Credit;
