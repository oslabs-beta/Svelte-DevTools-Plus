import { NextFunction, Request, Response, RequestHandler } from 'express';
import Contributors from '../client/components/Contributors';
import { contributorsController } from './controllers/contributorsController';
import { userController } from './controllers/userController';
const cors = require('cors');

const dotenv = require('dotenv');
//.config() will load the variables from the .env file into the Node.js environmen
dotenv.config();

const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
app.use(cors());

type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

app.use(express.json());
app.use(express.urlencoded());

//app.get('/', express.static(path.resolve(__dirname, './index.html')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));
// app.use('/', express.static(path.resolve(__dirname, '../dist/index.html')));
app.get(
  '/contributors',
  contributorsController.getAll,
  (req: Request, res: Response) => {
    console.log('in route');
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
app.get('/aouth', (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/aouth-callback', (req: Request, res: Response) => {
  res.status(200).json();
});

app.use((req: Request, res: Response) => {
  return res.status(404).send('Page Not Found');
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
