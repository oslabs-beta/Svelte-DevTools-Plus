import Contributors from '../client/components/Contributors';
import { contributorsController } from './controllers/contributorsController';

const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

//app.get('/', express.static(path.resolve(__dirname, './index.html')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));
// app.use('/', express.static(path.resolve(__dirname, '../dist/index.html')));
app.get(
  '/contributors',
  contributorsController.getAll,
  (req: any, res: any) => {
    return res.status(200).json(res.locals.contribuidors);
  }
);

app.use((req, res) => {
  return res.status(404).send('Page Not Found');
}); //want to redirect or send to pagenotfound

app.use((err, req, res, next) => {
  const defauldErr = {
    log: 'Error in some middleware',
    error: 500,
    message: { err: 'An error occur' },
  };
  const newErr = Object.assign({}, defauldErr, err);
  console.log(newErr.log);
  return res.status(newErr.error).json(newErr.message);
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
