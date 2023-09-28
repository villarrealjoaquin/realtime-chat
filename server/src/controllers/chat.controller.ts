import { Request, Response } from "express"
import userModel from "../models/user.schema"

export const getContact = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);

  try {
    const getUsers = await userModel.findOne({ email });
    console.log(getUsers);
    res.json(getUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
}

export const addContact = (req: Request, res: Response) => {
  const { contact_id } = req.body;

  console.log(contact_id);
}


export const getDataOfUser = async (req: Request, res: Response) => {
  const getData = await userModel.find()

  console.log(getData);
  

  res.send(getData);
}
