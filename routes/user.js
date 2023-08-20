import express from "express";
import { addProductToUser, deleteUser, getById, getUsers, updateUser } from "../controllers/user.js";
import { body, query } from "express-validator";
const userRouter = express.Router()

userRouter.get('/users', getUsers);

userRouter.get('/user/:id', getById);

userRouter.put('/addProduct/:id', addProductToUser);

userRouter.delete('/user/:id', deleteUser);

userRouter.put('/user', [body('email').optional()
    .isEmail()
    .withMessage('invalid email'),
body('password').optional()
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be at least between 6 and 20 charachters')], updateUser);

export default userRouter;