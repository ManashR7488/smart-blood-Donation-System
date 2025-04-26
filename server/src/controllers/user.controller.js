import { generateToken } from "../config/utils.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password, bloodType, gender, longitude, latitude } = req.body;
  // console.log("Signup data:", req.body);
  try {
    if (!fullname || !email || !password || !bloodType || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (
      !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodType)
    ) {
      return res.status(400).json({ message: "Invalid blood type" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: fullname,
      email,
      password: hashedPassword,
      bloodType,
      gender,
      location: longitude && latitude ? {
        type: "Point",
        coordinates: [longitude, latitude],
      } : undefined,
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      const currUser = await User.findById(newUser._id).select("-password");
      res.status(201).json({ user: currUser });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in User Signup Controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilPic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in User Login Controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {};
export const update = async (req, res) => {};
