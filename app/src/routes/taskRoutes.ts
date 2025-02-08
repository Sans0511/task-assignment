import express from "express";
import { createTask } from "../controllers/taskControllers";
import { accessTokenMiddleware } from "../middlewares/auth/authentication";
import {
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskControllers";

const router = express.Router();

router.post("/", accessTokenMiddleware, createTask);
router.get("/", accessTokenMiddleware, getTasksByUserId);
router.put("/:taskId", accessTokenMiddleware, updateTaskById);
router.delete("/:taskId", accessTokenMiddleware, deleteTaskById);

export default router;
