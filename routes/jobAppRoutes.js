import express from "express";
const router = express.Router();

import {
  applyJob,
  getAllAppliedJobs,
} from "../controllers/jobAppController.js";

router.route("/").post(applyJob).get(getAllAppliedJobs);

export default router;
