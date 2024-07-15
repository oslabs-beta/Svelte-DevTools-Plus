import bodyParser from "body-parser";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { HttpError } from "../types";
import passport from "./passport-config";
import session from 'express-session';
import AWS from "aws-sdk";

import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV;
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Connect to DynamoDB database
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World!");
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (nodeEnv === "development") {
    console.log(err);
  }
  return res.status(err.status || 500).send(err.message);
});

// Serves React app on all other routes. This must be the last route defined
app.get("*", (req, res) => {
  return res.status(404).send();
});

app.listen(port, () => {
  console.log(`Starting server. Listening on port ${port}`);
});
