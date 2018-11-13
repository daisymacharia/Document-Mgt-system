import mongoose from "mongoose";

let Schema = mongoose.Schema;

const Doc = new Schema({
	access: {
		type: String,
		default: "public"
	},
	ownerId: {
		type: String,
		max: 100
	},
	title: {
		type: String,
		validate: {
			validator: v => {
				return /^[a-z0-9_ ]+$/i.test(v);
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
				return /^[a-z0-9_ ]+$/i.test(v);
			},
			message: '"{VALUE}" is not valid content!'
		},
		required: [true, "Content is required"],
		min: 3
	},
	createdAt: { type: Date, default: Date() },
	modifiedAt: { type: Date, default: Date() }
});

const DocSchema = mongoose.model("Doc", Doc);
export default DocSchema;
