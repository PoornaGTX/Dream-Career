import express from "express";
const router = express.Router();

import {
  applyJob,
  getAllAppliedJobs,
  showStats,
  deleteAppJob,
  updateJobApp,
} from "../controllers/jobAppController.js";

router.route("/").post(applyJob).get(getAllAppliedJobs);
router.route("/:id").delete(deleteAppJob).patch(updateJobApp);
router.route("/job-App-stats").get(showStats);

export default router;
