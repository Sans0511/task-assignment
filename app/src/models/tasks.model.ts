import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITask extends Document {
  taskName: string;
  userId: string;
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  totalTasks: number;
  status: "pending" | "in-progress" | "completed";
}


const TaskSchema = new Schema<ITask>({
  taskName: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  totalTasks: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
});

export const TaskModel: Model<ITask> = mongoose.model<ITask>(
  "Task",
  TaskSchema
);
