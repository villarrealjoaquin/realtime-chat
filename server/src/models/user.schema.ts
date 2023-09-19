import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  username:String,
  password:String,
  email:String
});

const userModel = model(userCollection, userSchema);
export default userModel;