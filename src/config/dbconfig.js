// import { MongoClient } from "mongodb";
// import assert from "assert";
const MongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017/doc_management";

module.exports = MongoClient.connect(
	url,
	{ useNewUrlParser: true },
	(err, db) => {
		if (err) throw err;
		console.log("Database created!");
		db.close();
	}
);
