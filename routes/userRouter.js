import express from "express";

const router = express.Router();

import {
  deleteUser,
  UpdateUser,
  getAllUsers,
  showStats,
  getAllUsersForPDF,
} from "../controllers/userController.js";

router.route("/").get(getAllUsers);
router.route("/:id").patch(UpdateUser).delete(deleteUser);
router.route("/stats").get(showStats);
router.route("/allusers").get(getAllUsersForPDF);

export default router;
