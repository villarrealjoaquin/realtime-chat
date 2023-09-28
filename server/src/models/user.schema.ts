import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  alias: String,
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ],
  conversations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Conversation'
    }
  ]
});

const userModel = model(userCollection, userSchema);
export default userModel;