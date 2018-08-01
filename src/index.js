import express from "express";
import User from "./veiws/users";

import { verifyToken } from "./helpers/verify_token";

const user = new User();
const router = express.Router();

router.post("/users/", user.createUser);
router.post("/users/login", user.loginUser);
router.get("/users/", verifyToken, user.getUsers);
router.get("/users/:id", verifyToken, user.getUsers);
router.patch("/users/:id", verifyToken, user.updateUser);

export default router;
