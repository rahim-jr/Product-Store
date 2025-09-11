import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET ?? "access_secret_dev";
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET ?? "refresh_secret_dev";
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

const createAccessToken = (userId: string) =>
  jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });

const createRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password });
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken) return res.status(400).json({ message: "Missing refreshToken" });
    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { sub: string };
      const accessToken = createAccessToken(payload.sub);
      return res.json({ accessToken });
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Refresh failed" });
  }
};

export default { register, login, refresh };


