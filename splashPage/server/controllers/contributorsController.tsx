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

export const contributorsController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT * FROM Contributors';
    db.query(query).then((data: Data) => {
      // console.log('Data inside contributorController', data.rows);
      res.locals.contributors = data.rows;
      return next();
    });
    // .catch((err: ServerError) => {
    //   return next({
    //     message: { err: 'Error on ContributorsController' },
    //   });
    // });
  },
};
