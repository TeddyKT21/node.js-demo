import { v1 as uuid1 } from "uuid";
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";
import { addUser, getByDetails } from "../dal.js";

export const login = (req, res) => {
    const data = req.body;
    const { email, password } = req.body;
    console.log("login:", data);
    getByDetails(email, password, (user) => {
      console.log(user)
      if (!user) {
        res.status(404).json({ message: "user not found" })
        return;
      }
      bcrypt.compare(password, user.password, (err, result) => {
        !err && result ? res.status(200).json(user) : res.status(404).json({ message: "user not found" })
      })
    })
  }

  export const signUp = async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() });
      return;
    }
    const user = req.body;
    user.id = uuid1();
    user.password = await bcrypt.hash(user.password, 6,);
  
    console.log("adding user: ", user);
    addUser(user, () => {
      res.status(201).json(user);
    });
  }