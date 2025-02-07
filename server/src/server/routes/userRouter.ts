import express from "express";
import {
  addUser,
  getUserById,
  getUserByUsername,
} from "../controllers/userController";
import { Request, Response } from "express";

const router = express.Router();
// Route to add a new user
router.post("/", addUser);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/", (req: Request, res: Response, next) => {
  res.send("yay");
});

// Route to get a user by ID
router.get("/:id", getUserById);

// Route to get a user by username
router.get("/username/:username", getUserByUsername);

export default router;
