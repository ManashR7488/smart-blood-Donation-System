import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";

const Signup = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    donationDate: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize 3D Earth on desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.clientWidth === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    // Earth mesh
    const earthGeometry = new THREE.SphereGeometry(0.7, 64, 64);
    const loader = new THREE.TextureLoader();
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: loader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
      ),
      bumpMap: loader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
      ),
      bumpScale: 0.05,
      specularMap: loader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
      ),
      specular: new THREE.Color("grey"),
      shininess: 5,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Handle resizing
    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);

    // Reset after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        bloodType: "",
        donationDate: "",
        location: "",
      });
      setSuccess(false);
      setIsSubmitting(false);
      alert(`Thank you, ${formData.name}! We'll contact you soon.`);
    }, 1500);
  };
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      size:
        Math.random() > 0.5
          ? "w-8 h-8 bg-red-200/50"
          : "w-12 h-12 bg-red-200/30",
      left: `${Math.random() * 100}%`,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
    setBubbles(arr);
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-5">
      <div className="bg-white relative rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl w-full">
        <div className="absolute inset-0 pointer-events-none">
          {bubbles.map(({ id, size, left, duration, delay }) => (
            <motion.div
              key={id}
              className={`absolute rounded-full ${size}`}
              style={{ left }}
              animate={{ y: ["100vh", "-100vh"] }}
              transition={{ ease: "linear", duration, delay, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Visual Section (desktop only) */}
        

        {/* Form Section */}
        <div className="p-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <i className="lucide lucide-heart text-red-500 text-2xl" />
            <h1 className="text-2xl font-bold">Blood Donation Sign Up</h1>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Full Name */}
            
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-1">
              <div className="relative group">
                <i className="lucide lucide-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg transition-transform group-hover:scale-110" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm transition-transform group-hover:-translate-y-0.5"
                />
              </div>
              </label>
            </motion.div>



            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative group">
                <i className="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg transition-transform group-hover:scale-110" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm transition-transform group-hover:-translate-y-0.5"
                />
              </div>
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="relative group">
                <i className="lucide lucide-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg transition-transform group-hover:scale-110" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm transition-transform group-hover:-translate-y-0.5"
                />
              </div>
            </motion.div>

            {/* Blood Type */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Blood Type
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm"
              >
                <option value="">Select your blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </motion.div>

            {/* Donation Date */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Preferred Donation Date
              </label>
              <div className="relative group">
                <i className="lucide lucide-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg transition-transform group-hover:scale-110" />
                <input
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm transition-transform group-hover:-translate-y-0.5"
                />
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Nearest Donation Center
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm"
              >
                <option value="">Select a location</option>
                <option value="downtown">Downtown Blood Center</option>
                <option value="westside">Westside Donation Clinic</option>
                <option value="eastside">Eastside Community Hospital</option>
                <option value="north">North Medical Center</option>
                <option value="south">South Blood Bank</option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`mt-4 py-3 rounded-md text-white font-medium relative overflow-hidden focus:outline-none shadow-lg $ {
                success ? 'bg-green-500' : 'bg-red-500 pulse'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : success
                ? "✓ Success!"
                : "Sign Up to Donate"}
            </motion.button>
          </form>
        </div>


         <div
          ref={containerRef}
          className="hidden lg:flex relative min-h-[600px] bg-gradient-to-b from-red-100 to-red-400 items-center justify-center"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute bottom-10 w-full text-center z-10 pointer-events-none">
            <h2 className="text-red-700 text-xl font-bold mb-2">
              Every Drop Counts
            </h2>
            <p className="text-red-600">Your donation can save up to 3 lives</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;