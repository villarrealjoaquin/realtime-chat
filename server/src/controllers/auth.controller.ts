import userModel from "../models/user.schema";
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import shortId from 'shortid';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: 'email is in use' });

    const passwordHashed = await bcrypt.hash(password, 10);

    const alias = shortId.generate();

    const newUser = new userModel({
      username,
      email,
      password: passwordHashed,
      alias
    });

    const createUser = await newUser.save();

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) return res.status(500).json({ message: "Internal server error" });
    const token = jwt.sign({ id: newUser._id, username, email }, secretKey);

    res.cookie('chatToken', token);
    res.json({
      id: createUser._id,
      username: createUser.username,
      email: createUser.email
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    };
  };
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'user not exist' });

    if (typeof user.password === 'string') {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) return res.status(500).json({ message: "Internal server error" });
      const token = jwt.sign({ id: user.id }, secretKey);

      res.cookie('chatToken', token);
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        contacts: user.contacts,
        conversations: user.conversations
      });
    };
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    };
  };
}

export const verifyToken = async (req: Request, res: Response) => {
  const { chatToken } = req.cookies;
  
  if (!chatToken) return res.status(401).json({ message: 'Unauthorized 4' });

  if (!process.env.SECRET_KEY) return res.status(500).json({ message: 'internal Server Error' });

  jwt.verify(chatToken, process.env.SECRET_KEY, async (err: VerifyErrors | null, user: any) => {
    console.log(user);

    if (err) return res.status(401).json({ message: 'Unauthorized 1' })

    const userFound = await userModel.findById(user.id)
    console.log(userFound);

    if (!userFound) return res.status(401).json({
      message: 'Unauthorized 2'
    });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      contacts: userFound.contacts,
      conversation: userFound.conversations
    })
  })
};