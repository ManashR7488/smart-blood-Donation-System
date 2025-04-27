import React from "react";
import { motion } from "framer-motion";
import { HiCalendar, HiHeart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FiDroplet } from "react-icons/fi";

const stats = [
  { value: "20K+", label: "Active Donors" },
  { value: "500+", label: "Clinics" },
  { value: "1M+", label: "Donations" },
  { value: "24/7", label: "Support" },
];

const steps = [
  {
    step: "1",
    title: "Register",
    desc: "Create your donor profile in minutes",
  },
  { step: "2", title: "Schedule", desc: "Find nearby blood drives or clinics" },
  { step: "3", title: "Donate", desc: "Make a life-saving donation" },
];

const Home = () => {
  const navigate = useNavigate();


  const steps = [
    {
      icon: <HiHeart className="w-12 h-12 text-red-600" />,
      title: "Register",
      desc: "Create your donor profile in minutes"
    },
    {
      icon: <HiCalendar className="w-12 h-12 text-red-600" />,
      title: "Schedule",
      desc: "Find nearby blood drives or clinics"
    },
    {
      icon: <FiDroplet className="w-12 h-12 text-red-600" />,
      title: "Donate",
      desc: "Make a life-saving donation"
    },
  ];

  return (
    <main className="main-content w-full transition-margin duration-300 ease-in-out bg-base-100">
      {/* Hero Section */}
      <motion.section
        className="p-8 md:p-12 bg-gradient-to-r from-red-50 to-red-100"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl  flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Share Life,
              <br />
              <span className="text-red-600">Donate Blood</span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join our community of lifesavers. Your donation can save up to 3
              lives.
            </motion.p>
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors animate-pulse duration-75"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/scheduled")}
            >
              Become a Donor
            </motion.button>
          </div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <img
              src="https://cdn.usegalileo.ai/sdxl10/da9e61d4-ea8b-493f-86f3-2711a84ad7c7.png"
              alt="Blood donation"
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* about part */}

      <section className="py-16 px-20 bg-gray-50">
        <p>
        A blood bank in a hospital plays a crucial role in ensuring the availability of safe and adequate blood supply for medical treatments and emergencies. It serves as a vital lifeline, providing a repository of donated blood that can be used in various medical procedures, surgeries, and treatments for patients in need. The blood bank meticulously screens and tests donated blood to guarantee its safety and compatibility, adhering to strict quality control standards. Trained professionals manage the collection, processing, storage, and distribution of blood products, maintaining an inventory of different blood types to meet the diverse needs of patients. This essential facility not only supports routine medical care but also plays a pivotal role during disasters, accidents, and surgeries, where timely access to blood can be a matter of life and death. The blood bank is a cornerstone of modern healthcare, embodying the spirit of voluntary blood donation and community support in promoting the well-being of individuals in times of medical necessity.
        </p>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Blood Donation Matters
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every donation is a lifeline. Our hospital blood bank ensures:
            </p>
            <ul className="space-y-4">
              {[
                "Immediate availability for emergencies",
                "Rigorous safety screening",
                "24/7 critical care support",
                "Community health monitoring"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <HiHeart className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-red-600 mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to become a lifesaver
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute hidden md:block inset-0 w-2/3 mx-auto h-1 bg-gray-200 top-1/3 -translate-y-1/2"></div>
            {steps.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Blood Buddy</h4>
            <p className="text-gray-400">
              Connecting donors with those in need
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <HiCalendar className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          © 2025 Blood Buddy. All rights reserved. Team <span className="underline">RED CONNECT</span> # Cretive Cartel
        </div>
      </footer>
    </main>
  );
};

export default Home;
