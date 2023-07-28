import { NextFunction, Request, Response, RequestHandler } from 'express';
// import Contributors from '../client/components/GetContributor';
import { contributorsController } from './controllers/contributorsController';
import { userController } from './controllers/userController';
import { cookieController } from './controllers/cookieController';

const cookieParser = require('cookie-parser');

const cors = require('cors');

const dotenv = require('dotenv');
//.config() will load the variables from the .env file into the Node.js environmen
dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

//app.get('/', express.static(path.resolve(__dirname, './index.html')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));
// app.use('/', express.static(path.resolve(__dirname, '../dist/index.html')));

app.use('/login', express.static(path.resolve(__dirname, '../dist')));

app.use('/signup', express.static(path.resolve(__dirname, '../dist')));

app.use('/account', express.static(path.resolve(__dirname, '../dist')));

app.use('/acc', express.static(path.resolve(__dirname, '../dist')));

app.get(
  '/contributors',
  contributorsController.getAll,
  (req: Request, res: Response) => {
    console.log('Fetching contributors...');
    res.status(200).json(res.locals.contributors);
  }
);
app.post(
  '/loginUser',
  userController.getUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);
app.post(
  '/signUpNewUser',
  userController.createUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);
app.get('/auth', (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
  );
});

app.get(
  '/aouth-callback',
  userController.oauthGetToken,
  userController.oauthGetUserInf,
  cookieController.createCookie,
  (req: Request, res: Response) => {
    // res.redirect('/login?user=' + res.locals.userData.login);
    if (res.locals.user === true) {
      res.status(200).redirect('/acc');
    } else {
      res.status(200).redirect('/login');
    }
  }
);

// app.use((req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../index.html'));
// }); //want to redirect or send to pagenotfound
app.use((req: Request, res: Response) => {
  res.status(404).send('page No found');
}); //want to redirect or send to pagenotfound

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defauldErr = {
    log: 'Error in some middleware',
    status: 500,
    message: { err: 'An error occur' },
  };
  const newErr = Object.assign({}, defauldErr, err);
  console.log(newErr.log);
  return res.status(newErr.status).json(newErr.message);
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
