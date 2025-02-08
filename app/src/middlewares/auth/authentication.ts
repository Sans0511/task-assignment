import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../utils/authUtils";

interface AuthRequest extends Request {
  userId?: string;
}

const accessTokenMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res
      .status(403)
      .json({ validation: false, message: "Access token is required" });
    return;
  }

  const isValid = verifyAccessToken(token);

  if (!isValid.success) {
    res.status(403).json({
      validation: false,
      message: "Invalid or expired access token",
    });
    return;
  }
  req.userId = isValid.userId;
  next();
};

export { accessTokenMiddleware };
