import express from "express";
import {
    confirmAccount,
    loginUser,
    registerUser,
} from "../controllers/auth.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/confirm/:tokenConfirmation", confirmAccount)

router.post("/signup", registerUser);

router.post("/login", loginUser);

export default router;
