import { Schema, model } from 'mongoose';

const userCollection = 'users';


const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  alias: String,
  contacts: [
    {
      id: Schema.Types.ObjectId,
      username: String,
      email: String,
      alias: String
    }
  ],
  conversations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Conversations'
    }
  ]
});

const userModel = model(userCollection, userSchema);
export default userModel;