import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    modifyRoleUser,
    modiifyUser,
} from "../controllers/users.js";
import { authenticateToken, checkUserRole } from "../middleware/auth.js";

const router = express.Router();

// View all users only if the role is owner or admin
router.get("/all", authenticateToken, checkUserRole, getAllUsers);

// View personal profile
router.get("/profile", authenticateToken, getUserById);

// Modify personal information
router.patch("/modify", authenticateToken, modiifyUser);

// Modify a user's role only if the role is admin or owner
router.patch("/modify/role", authenticateToken, checkUserRole, modifyRoleUser) 

// Delete personal profile
router.delete("/delete", authenticateToken, deleteUser);

export default router;
