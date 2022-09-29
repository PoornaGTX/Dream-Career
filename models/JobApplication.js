import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JobApplication = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 50,
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
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
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    Status: {
      type: String,
      enum: ["Accepted", "Pending", "Rejected"],
      default: "Pending",
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApp", JobApplication);
