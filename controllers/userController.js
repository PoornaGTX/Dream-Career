import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";

import mongoose from "mongoose";

const getAllUsers = async (req, res) => {
  const { type, search, sort } = req.query;
  const queryObject = {};

  //chain sort conditions
  if (type && type !== "all") {
    queryObject.type = type;
  }
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
    console.log(search);
  }

  //no await
  let result = User.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }
  const users = await result;

  return res
    .status(StatusCodes.OK)
    .send({ users, totalUsers: users.length, numOfPages: 1 });
};

const UpdateUser = async (req, res) => {
  console.log("hello");
  const { id: uId } = req.params;
  console.log(`${uId} hello`);

  const { firstName, email, lastName, location, type } = req.body;

  if (!email || !type || !firstName || !lastName || !location) {
    throw new BadRequestError("Please Provide all values.");
  }
  const user = await User.findOne({ _id: uId });
  if (!user) {
    throw new NotFoundError(`No user with user ID ${uId}`);
  }
  const updateUser = await User.findOneAndUpdate({ _id: uId }, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).send({ updateUser });
};

const deleteUser = async (req, res) => {
  const { id: dId } = req.params;
  const user = await User.findOne({ _id: dId });
  if (!user) {
    throw new NotFoundError();
  }
  //check permissions

  await user.remove();
  return res.status(StatusCodes.OK).send({ msg: "Success! User Removed" });
};

const showStats = async (req, res) => {
  let stats = await User.aggregate([
    { $match: {} },
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    //cuur => current item
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Admin: stats.Admin || 0,
    Applicant: stats.Applicant || 0,
    Recruiter: stats.Recruiter || 0,
  };

  let monthelUserCreations = await User.aggregate([
    { $match: {} },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  res.status(StatusCodes.OK).json({ defaultStats, monthelUserCreations });
};

export { getAllUsers, UpdateUser, deleteUser, showStats };
