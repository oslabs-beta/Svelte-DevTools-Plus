import { NextFunction, Request, Response, RequestHandler } from 'express';
import Contributors from '../client/components/Contributors';
import { contributorsController } from './controllers/contributorsController';
const cors = require('cors');

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
