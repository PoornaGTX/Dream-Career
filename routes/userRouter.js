import express from "express";

const router = express.Router();

import {
  deleteUser,
  UpdateUser,
  getAllUsers,
} from "../controllers/userController.js";

router.route("/").get(getAllUsers);
router.route("/:id").patch(UpdateUser).delete(deleteUser);

export default router;
