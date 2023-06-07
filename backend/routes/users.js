import express from "express";
import { deleteUser, getAllUsers, getUserById, modiifyUser } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getAllUsers)
router.get("/user/:id", getUserById);

router.patch("/modify/:id", modiifyUser)

router.delete("/delete/:id", deleteUser)
export default router;