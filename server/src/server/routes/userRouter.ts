import express from "express";
import {
  addUser,
  getUserById,
  getUserByUsername,
} from "../controllers/userController";

const router = express.Router();

// Route to add a new user
router.post("/users", addUser);

// Route to get a user by ID
router.get("/users/:id", getUserById);

// Route to get a user by username
router.get("/users/username/:username", getUserByUsername);

export default router;
