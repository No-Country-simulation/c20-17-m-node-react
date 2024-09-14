import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/updateuser", updateUser);
// router.get('/me', getMe)

export default router;
