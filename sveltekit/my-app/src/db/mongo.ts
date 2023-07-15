// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { json } from 'body-parser';
import express, { Express } from 'express';
import mongoose, { MongooseOptions } from 'mongoose';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import dbController from './controller';

dotenv.config();
// const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const app: Express = express();

mongoose
	.connect(`${process.env.MONGO_URI}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	} as MongooseOptions)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Failed to connect to MongoDB:', error);
	});

mongoose.connection.once('open', () => {
	console.log('Connect to database...');
});

app.use(json());

app.get('/', dbController.getAll, (req, res) => {
	return res.status(200).json(res.locals.all);
});

app.post('/schedule', dbController.postContent, (req, res) => {
	return res.status(200).json(res.locals.postContent);
});

app.put('/schedule/:id', dbController.updateContent, (req, res) => {
	return res.status(200).json(res.locals.update);
});

app.delete('/schedule/:id', dbController.deleteContent, (req, res) => {
	return res.status(200).json(`Successfully deleted ${res.locals.deleteContent}`);
});

app.all('*', (req, res) => {
	res.status(400).send('Page not found');
});

app.use((err: Error, req: Request, res: Response) => {
	const defaultErr = {
		log: 'Expres error in middleware',
		status: 500,
		message: { err: 'An error occurred' }
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log(`Server is running in PORT ${PORT}`);
});

export const handle = app;
