import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import moment from "moment";

const getAllUsers = async (req, res) => {
  const { type, search, sort } = req.query;
  const queryObject = {};

  //chain sort conditions
  if (type && type !== "all") {
    queryObject.type = type;
  }
  if (search) {
    queryObject.firstName = { $regex: search, $options: "i" };
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

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const users = await result;
  const totalUsers = await User.countDocuments(queryObject);
  const numOfPagesAdmin = Math.ceil(totalUsers / limit);

  return res
    .status(StatusCodes.OK)
    .send({ users, totalUsers, numOfPagesAdmin });
};

const getAllUsersForPDF = async (req, res) => {
  const allusers = await User.find({});
  res.status(StatusCodes.OK).send({ allusers });
};

const UpdateUser = async (req, res) => {
  const { id: uId } = req.params;

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
    { $limit: 8 }, //limit is use to get latest 6 month data
  ]);

  monthelUserCreations = monthelUserCreations
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthelUserCreations });
};

export { getAllUsers, UpdateUser, deleteUser, showStats, getAllUsersForPDF };
