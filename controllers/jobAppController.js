import JobApp from "../models/JobApplication.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermission.js";

const applyJob = async (req, res) => {
  const {
    position,
    education,
    location,
    experience,
    jobType,
    editJobCreateID,
    company,
  } = req.body;
  console.log(req.body);
  if (
    !position ||
    !education ||
    !location ||
    !experience ||
    !jobType ||
    !editJobCreateID ||
    !company
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const jobApplication = {
    appliedBy: req.user.userId,
    recruiterID: editJobCreateID,
    experience,
    jobType,
    education,
    position,
    location,
    company,
  };
  const jobApp = await JobApp.create(jobApplication);
  res.status(StatusCodes.CREATED).json({ jobApp });
};

const getAllAppliedJobs = async (req, res) => {
  const AppliedJobs = await JobApp.find({ appliedBy: req.user.userId });
  console.log(AppliedJobs);
  res.status(StatusCodes.OK).json({
    AppliedJobs,
    AppliedTotalJobs: AppliedJobs.length,
    AppliedJobsNumOfPages: 1,
  });
};
export { applyJob, getAllAppliedJobs };
