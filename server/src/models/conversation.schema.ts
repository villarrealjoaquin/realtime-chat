import { Schema, model } from 'mongoose';

const conversationCollection = 'Conversations';

const conversationSchema = new Schema({
  participants: [Schema.Types.ObjectId, Schema.Types.ObjectId],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Messages' 
    }
  ]
});

const conversationModel = model(conversationCollection, conversationSchema);
export default conversationModel;