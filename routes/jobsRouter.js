import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
  getAllJobRequests,
  showStats,
  deleteJob,
  updateJob
} from "../controllers/jobController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/job-requests").get(getAllJobRequests);
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router;
