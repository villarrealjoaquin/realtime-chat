import { Response } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../middlewares/validateToken";
import conversationModel from "../models/conversation.schema";
import messageModel from "../models/messages.schema";
import userModel from "../models/user.schema";

export const getOrCreateConversation = async (user1Id: string, contactId: string) => {
  try {
    const user1ObjectId = new mongoose.Types.ObjectId(user1Id);
    const user2ObjectId = new mongoose.Types.ObjectId(contactId);

    const existingConversation = await conversationModel.findOne({
      participants: { $all: [user1ObjectId, user2ObjectId] }
    });

    if (!existingConversation) {
      const newConversation = new conversationModel({
        participants: [user1ObjectId, user2ObjectId]
      });

      const conversation = await newConversation.save();
      return conversation;
    }

    return existingConversation;
  } catch (error) {
    console.log(error);
  }
};

export const getChat = async (req: CustomRequest, res: Response) => {
  const { contactId } = req.params;
  const userId = req.user?.id;

  if (typeof userId !== 'string') return res.status(401).json({ message: 'Invalid Type' });

  try {
    const conversation = await getOrCreateConversation(userId, contactId);

    const user = await userModel.findById(userId);
    const foundContact = user?.contacts.find((contact) => contact.id?.toString() === contactId);

    const messages = await messageModel.find({ to: conversation?._id, });

    res.json({ conversation, user: foundContact, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error 10' });
  }
}

export const addMessage = async (req: CustomRequest, res: Response) => {
  const { newMessage, conversationId, contactId } = req.body;
  const senderId = req.user?.id;

  console.log({ newMessage, conversationId, senderId });

  try {
    const conversation = await conversationModel.findById(conversationId);
    if (!conversation) return res.status(404).json({ message: 'Conversación not found' });

    const message = new messageModel({
      sender: senderId,
      to: conversationId,
      content: newMessage
    });

    await message.save();

    conversation.messages.push(message._id);
    await conversation.save();

    // const recipientUser = await userModel.findById(contactId);
    // if (!recipientUser) return res.status(404).json({ message: 'Recipient user not found' });

    // console.log(recipientUser);

    // const senderContact = recipientUser?.contacts.some(contact => contact.id === senderId);

    // if (!senderContact) {
    //   const foundUser = await userModel.findById(senderId)
    //   console.log(foundUser, "found user");

    //   recipientUser.contacts.push(senderId);
    //   await recipientUser.save();
    // }

    res.send(message)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
  }
}