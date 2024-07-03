import bodyParser from "body-parser";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { HttpError } from "../types";
import AWS from "aws-sdk";
// import dataRoute from "./dataRoute";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV;
const app = express();

app.use(bodyParser.json());

// Connect to DynamoDB database
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// apiRouter.use("/data", dataRoute);

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
  console.log(`Starting Whose Turn to Pay server. Listening on port ${port}`);
});
