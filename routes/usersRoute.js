import express from 'express'
import { createUsers, deleteUsers, getUsers, updateUsers } from '../controllers/usersController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { userLogin } from '../controllers/login.js';

const usersRouter = express.Router()

usersRouter.route("/").get(verifyToken, getUsers).post(createUsers);
usersRouter.route("/:id").put(updateUsers).delete(deleteUsers);
usersRouter.route("/login").post(userLogin)
usersRouter.route("/verifytoken").post(verifyToken)

export { usersRouter }