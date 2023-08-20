import express from "express";
import { login, signUp } from "../controllers/auth.js";
import { body, query } from "express-validator";
const authRouter = express.Router()

authRouter.post('/signUp', [body('email')
    .isEmail()
    .withMessage('invalid email'),
body('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be at least between 6 and 20 charachters')], signUp);

authRouter.post('/login', login);



export default authRouter;