import jwt from "jsonwebtoken";
import express from "express";
import { secret } from "../config/config";

export const verifyToken = (req, res, next) => {
	var token = req.headers["x-access-token"];

	if (!token) return res.status(403).send({ message: "No token provided." });

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			res.status(500).send({ message: "Failed to authenticate token." });
			next();
		} else if (decoded) {
			req.username = decoded.username;
			req.role = decoded.role;
			req.user_id = decoded.user_id;
			next();
		}
	});
};
