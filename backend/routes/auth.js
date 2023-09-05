import express from "express";
import {
    confirmAccount,
    loginUser,
    registerUser,
    resetPassword,
    resetPasswordRequest,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/confirm/:tokenConfirmation", confirmAccount);

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/reset-password-request", resetPasswordRequest)

router.post("/reset-password", resetPassword)

export default router;
