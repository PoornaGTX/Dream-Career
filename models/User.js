import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false, //front end ekata pennene ne value eka
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  type: {
    type: String,
    required: [true, "please provide account type."],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

//password hashing
//.pre mean before save the document we want run a function
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10); //password hash wenawa characters 10 kata
  this.password = await bcrypt.hash(this.password, salt);
});

//JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
