import { Request, Response } from "express";
import { TaskModel } from "../models/tasks.model";

interface AuthRequest extends Request {
  userId?: string;
}

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const { taskName, description, startDate, endDate, totalTasks, status } =
    req.body;

  try {
    const newTask = new TaskModel({
      taskName,
      userId,
      description,
      startDate,
      endDate,
      totalTasks,
      status,
    });

    const task = await newTask.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTasksByUserId = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const keyword = req.query.keyword as string | undefined;
  const skip = (page - 1) * limit;

  try {
    let tasks;
    let totalTasks;

    if (keyword) {
      const searchQuery = {
        userId: userId,
        $or: [
          { status: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { taskName: { $regex: keyword, $options: "i" } },
        ],
      };

      tasks = await TaskModel.find(searchQuery).skip(skip).limit(limit);
      totalTasks = await TaskModel.countDocuments(searchQuery);
    } else {
      tasks = await TaskModel.find({ userId }).skip(skip).limit(limit);
      totalTasks = await TaskModel.countDocuments({ userId });
    }

    const totalPages = Math.ceil(totalTasks / limit);

    if (tasks.length === 0) {
      res.status(404).json({ message: "No tasks found for this user" });
      return;
    }

    res.status(200).json({
      tasks,
      currentPage: page,
      totalPages,
      totalTasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTaskById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const userId = req.userId;
  const { taskName, description, startDate, endDate, totalTasks, status } =
    req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        taskName,
        userId,
        description,
        startDate,
        endDate,
        totalTasks,
        status,
      },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
