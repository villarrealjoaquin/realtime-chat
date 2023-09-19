import jwt from 'jsonwebtoken';
import { ObjectId, Schema } from 'mongoose';

const secretKey = 'mario2030';

interface Payload {
  id: any
  username: string
  email:string
}

export function createAccessToken(payload:Payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
} 
