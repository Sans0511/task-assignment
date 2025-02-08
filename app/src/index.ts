import express from "express";
import connectToDatabase from "./config/db.config";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import loginRouter from "./routes/loginRoutes";
import taskRouter from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use("/register", userRouter);
app.use("/login", loginRouter);
app.use("/tasks", taskRouter);

(async () => {
  await connectToDatabase();
})();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
