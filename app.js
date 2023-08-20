import express from 'express';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

const app = express();


app.use(express.json());
app.use(userRouter);
app.use(authRouter);

app.listen(8080,()=>{
console.log('yay I have a server now !');
});