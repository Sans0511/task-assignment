import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const verifyAccessToken = (
  token: string
): { success: boolean; userId?: string } => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      userId: string;
    };

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { success: true, userId: decoded.userId };
  } catch (error) {
    return { success: false };
  }
};

export { generateAccessToken, verifyAccessToken };
