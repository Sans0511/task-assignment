import express from "express";
import { registerUser } from "../controllers/registartionController";


const router = express.Router();

router.post("/", registerUser);

export default router;
