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

    if (res.locals.user === true) {
      return next();
    }
    console.log(req.body);
    const { password } = req.body;
    const email = [req.body.email];
    const query = 'SELECT * FROM Users WHERE email = $1';

    db.query(query, email)
      .then((data: Data) => {
        console.log(data, 'when is not found');
        if (data.rows.length < 1) {
          res.locals.user = false;
        } else if (data.rows[0].password === password) res.locals.user = true;
        console.log('getting out of userController');
        return next();
      })
      .catch((error: Error) => {
        // Handle the error here if necessary
        next({ message: { err: 'An error occur in getUser' } });
      });
  },

  //Janice Create user and add error handlers
  createUser: (req: Request, res: Response, next: NextFunction) => {
    console.log('getting in Create new User');
    const { name, lastName, email, password } = req.body;
    console.log('body', req.body);
    const query = `INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)`;

    db.query(query, [name, lastName, email, password]).then((data: Data) => {
      console.log('new User', data);
      // res.locals.newUser = data.rows[0];
      res.locals.user = true;
      return next();
    });
    // .catch((error: Error) => {
    //   // Handle the error here if necessary
    //   next({ message: { err: 'An error occur in createUser' } });
    // });
  },

  oauthGetToken: async (req: Request, res: Response, next: NextFunction) => {
    console.log('geeting in in oauth middleware');

    const { code } = req.query;

    const bodyPart = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code: code,
    };

    const response: any = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(bodyPart),
      }
    );
    const token = await response.text();
    res.locals.token = token;
    return next();
  },
  oauthGetUserInf: async (req: Request, res: Response, next: NextFunction) => {
    console.log('geeting in in GetUserInf middleware');
    const token = res.locals.token;
    console.log('token', token);
    const response: any = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token.split('&')[0].split('=')[1]}` },
    });
    const data = await response.json();
    console.log('Authenticated User Information: ', data);
    // Based on this below data can you just check if it is formatted
    // correctly and then just send client to new page?
    res.locals.userData = data;
    if (data.type === 'User') {
      console.log('data.type from github', data.type);
      res.locals.user = true;
    } else {
      res.locals.user = false;
    }
    return next();
  },
};
