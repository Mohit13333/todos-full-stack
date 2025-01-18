import { Router } from "express";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodos,
  getSortedTodos,
  todoStatus,
} from "../controllers/todos.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/post").post(authMiddleware, createTodo);
router.route("/getTodos").get(authMiddleware, getTodos);
router.route("/deleteTodos/:id").delete(authMiddleware, deleteTodo);
router.route("/updateTodos/:id").put(authMiddleware, updateTodos);
router.route("/toggleCheck/:id").put(authMiddleware, todoStatus);
router.route("/getSortedTodos").get(authMiddleware, getSortedTodos);


export default router;
