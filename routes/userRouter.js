import express from "express";

const router = express.Router();

import {
  deleteUser,
  UpdateUser,
  getAllUsers,
  showStats,
} from "../controllers/userController.js";

router.route("/").get(getAllUsers);
router.route("/:id").patch(UpdateUser).delete(deleteUser);
router.route("/stats").get(showStats);

export default router;
