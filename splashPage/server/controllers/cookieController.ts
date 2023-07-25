const { query, json } = require('express');
const db = require('../dbModel/dbModel.ts');
import { NextFunction, Request, Response, RequestHandler } from 'express';

export const cookieController = {
  createCookie: async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user === true) {
      res.cookie('token', 'user', { httpOnly: true }); // name, value, options}
    }
    return next();
  },
};
