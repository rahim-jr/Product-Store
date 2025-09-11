import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  res.json({ message: "List of users" });
};

export default { getUsers };
