import { Schema, model } from 'mongoose';

const messageCollection = 'Messages';

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'users' },
  to: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const messageModel = model(messageCollection, messageSchema);
export default messageModel;
