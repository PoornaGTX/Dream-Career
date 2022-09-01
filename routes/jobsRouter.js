import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
  getAllJobRequests
} from "../controllers/jobController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/job-requests").get(getAllJobRequests);

export default router;
