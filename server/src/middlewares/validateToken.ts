import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface User {
  id:string;
  iat:number;
}

export interface CustomRequest extends Request {
  user?: User;
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { chatToken } = req.cookies;

  if (!chatToken) return res.status(401).json({ message: 'you need a valid token' });

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) return res.status(500).json({ message: 'Internal Server Error' });

  jwt.verify(chatToken, secretKey, (err: VerifyErrors | null, user: any) => {
    console.log(user);
    
    if (err) return res.status(403).json({ message: 'Token denied' });
    req.user = user;
    next();
  });
};