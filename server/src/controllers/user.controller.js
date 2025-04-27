import { generateToken } from "../config/utils.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
// routes/otp.js
import Twilio from 'twilio';

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
      return res.status(201).json({ user: currUser });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
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

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in User Login Controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
};

export const update = async (req, res) => {};

/**
 * Single endpoint to send or verify an OTP via Twilio Verify.
 */
export const verifyotp = async (req, res) => {
  const { userId, phoneNumber, otp } = req.body;
  // console.log(userId, phoneNumber, otp);
  if (!userId || !phoneNumber) {
    return res.status(400).json({ message: 'userId and phoneNumber are required' });
  }

  const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  try {
    // 1. Send OTP if no code provided
    if (!otp) {
      await client.verify.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });
      return res.status(200).json({ message: 'OTP sent successfully' });
    }

    // 2. Verify provided OTP
    const check = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: phoneNumber, code: otp });

    if (check.status === 'approved') {
      const user = await User.findById(userId);
      if (user) {
        user.verified = true;
        await user.save();
        user.phone = phoneNumber; // Save the phone number to the user document
        await user.save();
      }
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('OTP Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
