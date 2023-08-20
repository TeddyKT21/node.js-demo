import { deleteUser as deleteUserDal, findById, getAll, getByDetails, updateUser as updateUserDal } from "../dal.js";
import bcrypt from 'bcrypt'
import { addProduct, sendUser } from "../services.js";

export const getUsers = (req, res) => {
  getAll((users) => res.status(200).json(users));
}

export function getById(req, res) {
  const id = req.params.id;
  console.log(id);
  findById(id, (user) => {
    if (user) res.status(200).json(user)
    else res.status(404).json({ message: 'user not found' });
  });
}


export const addProductToUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  findById(id, async (user) => {
    try {
      user = await addProduct(user);
      console.log(user);
      await sendUser(user);
      updateUserDal(user, (user) => {
        console.log('user updated...');
        !user ? 
        res.status(500).json({ message: "failed to add a product to the user" }) : 
        res.status(201).json(user)
      })
    }
    catch (error) {
      console.error('error:', error);
      console.log(user);
      res.status(500).json({ message: "failed to add a product to the user" });
    }
  });
}


export const updateUser = (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.password) bcrypt.hash(data.password, 6,).then((password) => {
    data.password = password;
    updateUserDal(data, (user) => {
      user ? res.status(200).json(user) : res.status(404).json({ message: "user not found" });
    });
  });
}

export const deleteUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  deleteUserDal(id.slice(1), (ans) => {
    ans ? res.status(200).json({ message: "user deleted" }) : res.status(404).json({ message: "user not found" });
  });
}
