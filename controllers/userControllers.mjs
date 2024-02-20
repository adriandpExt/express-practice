import asyncHandler from "express-async-handler";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "Email already taken" });
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  if (!newUser) {
    return res.status(400).json({ message: "User data is not valid" });
  }

  res.status(200).json({
    _id: newUser.id,
    email: newUser.email,
    message: "Successfully registered",
  });
});

export const getAllUser = asyncHandler(async (req, res) => {
  // Fetch all users from the database
  const users = await User.find();

  // Check if any users are found
  if (!users || users.length === 0) {
    return res.status(404).json({ message: "Users not found" });
  }

  // Respond with the users and the count of users
  res.status(200).json({
    users,
    message: `${users.length} records found `,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  const user = await User.findOne({ email });

  if (user && (await compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );

    return res.status(200).json(accessToken);
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});
