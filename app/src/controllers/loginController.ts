import { Request, Response, RequestHandler } from "express";
import User from "../models/user.model";
const bcrypt = require("bcrypt");

import { generateAccessToken } from "../utils/authUtils";

const loginUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    if (user._id) {
      const accessToken = generateAccessToken(user._id.toString());
      res.status(200).json({
        success: true,
        accessToken,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

export { loginUser };
