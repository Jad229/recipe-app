import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// POST registering users
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Confirm if username exist
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });

  // If the user was created successfully
  if (newUser) {
    res.status(200).json({
      _id: newUser.id,
      username,
      message: "User registered successfully",
    });
  } else {
    res.status(400).json({
      message: "Invalid user data",
    });
  }
});

// POST logging in users
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token, userID: user._id });
});

export { router as userRouter };
