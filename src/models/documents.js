import mongoose from "mongoose";
import { db } from "../config/config";

let conn = db;
let Schema = mongoose.Schema;

const Doc = new Schema({
	ownerId: { type: Int, max: 100 },
	title: {
		type: String,
		validate: {
			validator: v => {
				return /^[a-z0-9]+$/i.test(v);
			},
			message: '"{VALUE}" is not a valid title!'
		},
		required: [true, "Title is required"],
		min: 3,
		max: 100
	},
	content: {
		type: String,
		validate: {
			validator: v => {
				return /^[a-z0-9]+$/i.test(v);
			},
			message: '"{VALUE}" is not valid content!'
		},
		required: [true, "Content is required"],
		min: 3
	},
	createdAt: { type: Date },
	modifiedAt: { type: Date }
});

const DocSchema = mongoose.model("Doc", Doc);
export default DocSchema;
