import express from "express";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  frogetPassword,
  newPassword,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/login/frogetpassword").post(frogetPassword);
router.route("/login/newpassword/:id/:token").post(newPassword);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
