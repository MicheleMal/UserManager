import express from "express";
import {
    confirmAccount,
    loginUser,
    register,
    resetPassword,
    resetPasswordRequest,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/confirm/:tokenConfirmation", confirmAccount);

router.post("/signup", register);

router.post("/login", loginUser);

router.post("/reset-password-request", resetPasswordRequest)

router.post("/reset-password", resetPassword)

export default router;
