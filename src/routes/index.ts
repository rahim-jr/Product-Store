import { Router } from "express";
import userController from "../controllers/userController";
import requireAuth from "../middleware/auth";

const router = Router();

router.get("/users", requireAuth, userController.getUsers);

export default router;
