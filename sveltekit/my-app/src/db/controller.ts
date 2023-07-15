import type { Request, Response, NextFunction } from 'express';
import { DbModel, IDbDocument } from './schema';

const dbController = {
	async postContent(req: Request, res: Response, next: NextFunction) {
		try {
			const { content } = req.body;
			const response: IDbDocument = await DbModel.create({ content: content });
			res.locals.postContent = response;
			next();
		} catch (err) {
			next({
				log: 'Error occurred in postContent middleware',
				message: 'Error occurred in postContent middleware'
			});
		}
	},
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const response: IDbDocument[] = await DbModel.find({});
			res.locals.all = response;
			next();
		} catch (err) {
			next({
				log: 'Error occurred in getAll middleware',
				message: 'Error occurred in getAll middleware'
			});
		}
	},
	async updateContent(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { content } = req.body;
			const response: IDbDocument | null = await DbModel.findByIdAndUpdate(
				id,
				{ content },
				{ new: true }
			);
			res.locals.update = response;
			next();
		} catch (err) {
			next({
				log: 'Error occurred in getAll middleware',
				message: 'Error occurred in getAll middleware'
			});
		}
	},
	async deleteContent(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const response: IDbDocument | null = await DbModel.findByIdAndDelete(id);
			res.locals.delete = response;
			next();
		} catch (err) {
			next({
				log: 'Error occurred in getAll middleware',
				message: 'Error occurred in getAll middleware'
			});
		}
	}
};

export default dbController;
