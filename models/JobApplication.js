import mongoose from "mongoose";

const JobApplication = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 50,
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
      maxlength: 100,
    },
    education: {
      type: String,
      enum: ["Undergraduate", "Graduate", "Masters", "Phd"],
      default: "Undergraduate",
    },

    jobType: {
      type: String,
      enum: ["Remote", "On-location", "Hybrid"],
      default: "Remote",
    },
    experience: {
      type: String,
      default: "No Experience",
      required: true,
    },
    appliedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide applicant."],
    },
    recruiterID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide recruiter."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApp", JobApplication);
