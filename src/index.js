import express from "express";
import { test } from "./veiws/users";

export const router = express.Router();

// a simple test url to check that all of our files are communicating correctly.
export const testRoute = router.get("/test", test);
