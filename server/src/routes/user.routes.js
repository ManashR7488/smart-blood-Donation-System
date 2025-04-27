import express from "express";
import { checkAuth, login, logout, signup, update, verifyotp } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", verifyUser, checkAuth);

// otp verification 
router.post("/verifyotp", verifyUser, verifyotp);

router.post("/update", update);

export default router;
