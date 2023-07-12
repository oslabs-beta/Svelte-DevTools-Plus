import { Document, Schema, model, Model } from 'mongoose';

interface IDbDocument extends Document {
	content: string;
	created_at: Date;
}

const DbSchema: Schema<IDbDocument> = new Schema<IDbDocument>({
	content: { type: String, required: true },
	created_at: { type: Date, default: Date.now }
});

let DbModel: Model<IDbDocument>;

try {
	// Try accessing the model if it's already compiled
	DbModel = model<IDbDocument>('DbModel');
} catch (error) {
	// If the model doesn't exist, compile it
	DbModel = model<IDbDocument>('DbModel', DbSchema);
}

export { DbModel, IDbDocument };
