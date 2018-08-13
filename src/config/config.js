import mongoose from "mongoose";

mongoose.Promise = global.Promise;

let url = "mongodb://localhost:27017/doc_management";

export const db = mongoose.connect(
	url,
	{ useNewUrlParser: true },
	(err, db) => {
		console.log("database created");
		if (err) throw err;
	}
);
export const secret = "verysecret1234!@##";
