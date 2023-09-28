import { Schema, model } from 'mongoose';

const contactCollection = 'Contacts';

const contactSchema = new Schema({
  name: String, 
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const contactModel = model(contactCollection, contactSchema);
export default contactModel;