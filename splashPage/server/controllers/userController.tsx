const { query, json } = require('express');
const db = require('../dbModel/dbModel.ts');
import { NextFunction, Request, Response, RequestHandler } from 'express';
const dotenv = require('dotenv');
//.config() will load the variables from the .env file into the Node.js environmen
dotenv.config();

type Data = {
  rows: [
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
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
    console.log('inside userController getUser');
    console.log(req.body);
    const { password } = req.body;
    const email = [req.body.email];
    const query = 'SELECT * FROM Users WHERE email = $1';

    db.query(query, email).then((data: Data) => {
      console.log(data, 'when is not found');
      if (data.rows.length < 1) {
        res.locals.user = false;
      } else if (data.rows[0].password === password) res.locals.user = true;
      console.log('getting out of userController');
      return next();
    });
  },

  //Janice Create user and add error handlers
  createUser: (req: Request, res: Response, next: NextFunction) => {
    return next();
  },

  // oauth: async (req: Request, res: Response, next: NextFunction) => {
  //   const { code } = req.query;
  //   const bodyPart = {
  //     client_id: process.env.GITHUB_CLIENT_ID,
  //     client_secret: process.env.GITHUB_SECRET,
  //     code: code,
  //   };
  //   const response = await fetch('https://github.com/login/oauth/access_token',{
  //   method:'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify(bodyPart)
  // })
  // const token =
  // },
};
