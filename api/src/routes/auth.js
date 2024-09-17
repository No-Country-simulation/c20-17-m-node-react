import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  forgotPassword
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/updateuser", updateUser);

router.post('/forgotpassword', forgotPassword);

export default router;
