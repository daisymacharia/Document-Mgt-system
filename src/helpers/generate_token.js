import jwt from "jsonwebtoken";
import express from "express";
import { secret } from "../config/config";

const app = express();
app.set("superSecret", secret); // secret variable

const generate_token = (username, user_id, role) => {
	const payload = {
		username,
		user_id,
		role
	};

	var token = jwt.sign(payload, app.get("superSecret"), {});
	return token;
};

export default generate_token;
