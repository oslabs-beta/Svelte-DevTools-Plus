import express from "express";
// import authController from "../controllers/authController.js";
import passport from "../passport-config";
import { Request, Response } from "express";

const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(500).send("Failed to get user data");
    }
    return res.status(200).json({ username: req.user.username });
  },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else res.status(200).send("You are now logged out");
  });
});

export default router;
