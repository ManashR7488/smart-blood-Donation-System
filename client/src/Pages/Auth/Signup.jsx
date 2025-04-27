import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";
import { LuUserRound } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore";
import { CgSpinner } from "react-icons/cg";

const Signup = () => {
  const canvasRef = useRef(null);

  const { isSigningUp, signup } = useAuthStore();

  const containerRef = useRef(null);
  const [isView1, setIsView1] = useState(false);
  const [isView2, setIsView2] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    conPassword: "",
    latitude: null,
    longitude: null,
    gender: "",
    bloodType: "",
  });
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

  const [validClass, setValidClass] = useState("");
  const passLeble = useRef(null);

  useEffect(() => {
    if (
      formData.password === formData.conPassword &&
      formData.password.length > 0
    ) {
      setValidClass("border-green-500");
    } else if (
      formData.conPassword.length > 1 &&
      formData.password !== formData.conPassword
    ) {
      setValidClass("border-red-500");
    } else {
      setValidClass("");
    }
  }, [formData]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const handdleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    await signup({
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      longitude: formData.longitude,
      latitude: formData.latitude,
      gender: formData.gender,
      bloodType: formData.bloodType,
    });
  };

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

          <form onSubmit={handdleSubmit} className="flex flex-col gap-6">
            {/* Full Name */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="input validator w-full">
                <LuUserRound className="opacity-50" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </label>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="input validator w-full">
                <IoMailOutline className="opacity-50" />
                <input
                  type="email"
                  placeholder="Type Email"
                  required
                  className="w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className=""
            >
              <label className="input validator pr-0  w-full" ref={passLeble}>
                <RiLockPasswordLine className="opacity-50" />
                <input
                  type={isView1 ? "test" : "password"}
                  required
                  placeholder="Password"
                  minLength="6"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="btn h-full w-fit px-2 bg-transparent border-none cursor-pointer"
                  onClick={() => setIsView1(!isView1)}
                >
                  {" "}
                  {isView1 ? (
                    <FiEye className="size-4 opacity-60" />
                  ) : (
                    <FiEyeOff className="size-4 opacity-60" />
                  )}{" "}
                </button>
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className=""
            >
              <label className={`input pr-0  w-full ${validClass} `}>
                <RiLockPasswordLine className="opacity-50" />
                <input
                  type={isView2 ? "test" : "password"}
                  required
                  placeholder="Password"
                  className=""
                  value={formData.conPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, conPassword: e.target.value });
                  }}
                />
                <button
                  className="btn h-full w-fit px-2 bg-transparent border-none "
                  onClick={() => setIsView2(!isView2)}
                >
                  {" "}
                  {isView2 ? (
                    <FiEye className="size-4 opacity-60" />
                  ) : (
                    <FiEyeOff className="size-4 opacity-60" />
                  )}{" "}
                </button>
              </label>
            </motion.div>

            {/* Blood Type */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <select
                name="bloodType"
                onChange={(e) =>
                  setFormData({ ...formData, bloodType: e.target.value })
                }
                required
                defaultValue="Select your blood type"
                className="select w-full pl-3 pr-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm"
              >
                <option disabled>Select your blood type</option>
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

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <select
                name="gender"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
                defaultValue="Sex"
                className="select w-full pl-3 pr-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm"
              >
                <option disabled>Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`btn mt-4 py-3 rounded-md  font-medium relative overflow-hidden focus:outline-none shadow-lg ${
                success ? "bg-green-500" : "bg-red-500 pulse"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <CgSpinner className="animate-spin text-2xl duration-150" />
              ) : (
                "Create Account"
              )}
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
