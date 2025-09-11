import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET: jwt.Secret = (process.env.JWT_ACCESS_SECRET ?? "access_secret_dev") as jwt.Secret;

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token as string, JWT_ACCESS_SECRET) as { sub: string };
    req.userId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default requireAuth;


