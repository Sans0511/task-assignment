import { Request, Response } from "express";
import User from "../models/user.model";
const bcrypt = require("bcrypt");

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      mobileNumber,
      password,
      country,
      city,
      state,
      gender,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      country,
      city,
      state,
      gender,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export { registerUser };
