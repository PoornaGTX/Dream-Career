import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
} from "../controllers/jobController.js";

router.route("/").post(createJob).get(getAllJobs);

export default router;
