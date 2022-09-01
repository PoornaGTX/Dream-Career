import express from "express";
const router = express.Router();

import { applyJob } from "../controllers/jobAppController.js";

router.route("/").post(applyJob);

export default router;
