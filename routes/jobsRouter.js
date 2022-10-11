import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
  getAllJobRequests,
  showStats,
  deleteJob,
  updateJob,
  respondToJobReq
} from "../controllers/jobController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/job-requests").get(getAllJobRequests);
router.route("/job-requests/:id").patch(respondToJobReq)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router;
