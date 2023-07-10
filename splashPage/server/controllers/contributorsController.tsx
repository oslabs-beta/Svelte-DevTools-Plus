const { query, json } = require('express');
// import db from '../dbModel/dbModel.js';
// const contribuidorsController = {};

import { NextFunction } from 'express';

// contribuidorsController.getAll = function (req, res, next) {};

// export default contribuidorsController;

export const contributorsController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {},
};
