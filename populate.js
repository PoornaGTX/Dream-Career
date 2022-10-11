import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./db/connect.js";
import User from "./models/User.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const jsonUsers = JSON.parse(
      await readFile(new URL("./MOCK_DATA_USERS.json", import.meta.url))
    );
    await User.create(jsonUsers);
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

start();

// adding