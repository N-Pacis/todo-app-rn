import { Router } from "express";
import { createTodo, getTodos } from "../controllers/todo.controller.js";

const router = Router();

router.get("/todos", getTodos);

router.post("/todos/new", createTodo);

export default router;
