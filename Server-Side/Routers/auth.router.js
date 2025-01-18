import { Router } from "express";
import { register, login, user } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(authMiddleware, user);

export default router;
