import { NextFunction, Request, Response, RequestHandler } from 'express';

const dotenv = require('dotenv');
//.config() will load the variables from the .env file into the Node.js environmen
dotenv.config();

export const test = {
  test: (req: Request, res: Response, next: NextFunction) => {
    console.log('Client_id', process.env.GITHUB_CLIENT_ID);
    return next();
  },
};
