import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface User {
  id: string
  username:string;
  email: string;
  passport: string;
}

interface CustomRequest extends Request {
  user?: any;
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { chatToken } = req.cookies;

  console.log(req.body);

  if (!chatToken) return res.status(401).json({ message: 'you need a valid token' });

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) return res.status(500).json({ message: 'Internal Server Error' });

  jwt.verify(chatToken, secretKey, (err: VerifyErrors | null, user: any) => {
    if (err) return res.status(403).json({ message: 'Token denied' });
    console.log(user);
    req.user = user;
    next();
  });
};