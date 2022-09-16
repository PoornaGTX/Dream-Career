import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";

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

export { getAllUsers, UpdateUser, deleteUser };
