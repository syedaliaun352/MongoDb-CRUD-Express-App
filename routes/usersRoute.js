import express from 'express'
import { createUsers, deleteUsers, getUsers, updateUsers } from '../controllers/usersController.js';

const usersRouter = express.Router()

usersRouter.route("/").get(getUsers).post(createUsers);
usersRouter.route("/:id").put(updateUsers).delete(deleteUsers);

export { usersRouter }