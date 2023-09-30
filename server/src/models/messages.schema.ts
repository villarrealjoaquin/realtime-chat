import { Schema, model } from 'mongoose';

const conversationCollection = 'Conversations';

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [messageSchema]
});

const conversationModel = model(conversationCollection, conversationSchema);
export default conversationModel;
