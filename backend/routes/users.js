import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    modiifyUser,
} from "../controllers/users.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/profile", authenticateToken, getUserById);

router.patch("/modify", authenticateToken, modiifyUser);

router.delete("/delete", authenticateToken, deleteUser);
export default router;
