import { Request, Response } from "express";
import userModel from "../models/user.schema";

export const getContact = async (req: Request, res: Response) => {
  const { email, id } = req.body;

  try {
    const getUser = await userModel.findOne({ email });
    const currentUser = await userModel.findById(id);

    const hasContact = currentUser?.contacts.some((contact) => contact.email === email);
    if (hasContact) return res.status(401).json({ message: 'contact already added' });

    const sendContact = {
      id: getUser?._id,
      username: getUser?.username,
      email: getUser?.email,
      alias: getUser?.alias
    }

    res.json(sendContact);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
}

export const addContact = async (req: Request, res: Response) => {
  const { id, contact } = req.body;

  if (!id || !contact) return res.status(401).json({ message: 'data invalid' });

  try {
    const userFound = await userModel.findById(id);
    if (!userFound) return res.status(404).json({ message: 'User not found' });

    userFound.contacts.push(contact);
    await userFound.save();

    res.status(200).json({ message: 'Contact added successfully', newContact: userFound });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = userModel.findOne({ id });
  if (!user) return res.status(400).json({ message: 'Contact not found' });

  console.log(user);
  

  res.status(204).json({ message: 'delete contact succesfully' });
}