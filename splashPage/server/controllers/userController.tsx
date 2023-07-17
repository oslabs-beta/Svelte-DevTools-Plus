const { query, json } = require('express');
const db = require('../dbModel/dbModel.ts');
import { NextFunction, Request, Response, RequestHandler } from 'express';

type Data = {
  rows: [
    {
      id: number;
      lastName: string;
      firstName: string;
      gitHub: string;
      linkedIn: string;
    }
  ];
};
type ServerError = {
  log?: string;
  status?: number;
  message: { err: string };
};

export const userController = {
    //Francis Create user and add error handlers 
  getUser: (req: Request, res: Response, next: NextFunction) => {
      return next();
    }),

 //Janice Create user and add error handlers   
createUser: (req: Request, res: Response, next: NextFunction) => {
        return next();
      }),
   
  }