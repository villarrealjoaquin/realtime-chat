import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  console.log(req.body);

  // if (!token) return res.status(401).json({ message: 'you need a valid token' });
  if (!token) return res.redirect('/login');

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) return res.status(500).json({ message: 'Internal Server Error' });

  jwt.verify(token, secretKey, (err: VerifyErrors | null, user: any) => {
    if (err) return res.status(403).json({ message: 'Token denied' });
    console.log(user);
    req.user = user;
    next();
  });
};