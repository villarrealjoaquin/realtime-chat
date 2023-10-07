import mongoose from "mongoose";
import { CustomRequest } from "../middlewares/validateToken";
import userModel from "../models/user.schema";
import conversationModel from "../models/conversation.schema";
import messageModel from "../models/messages.schema";
import { Request, Response } from "express";

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
    console.log(conversation);

    const user = await userModel.findById(userId);
    const foundContact = user?.contacts.find((contact) => contact.id?.toString() === contactId);

    const messages = await messageModel.find({
      to: conversation?._id,
    }).populate('sender');

    await conversation?.populate('messages');
    res.json({ conversation, user: foundContact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error 10' });
  }
}

export const addMessage = async (req: CustomRequest, res: Response) => {
  const { newMessage, conversationId } = req.body;
  const senderId = req.user?.id;

  console.log({ newMessage, conversationId, senderId });

  try {
    const conversation = await conversationModel.findById(conversationId);
    if (!conversation) return res.status(404).json({ message: 'Conversación not found' });

    const message = new messageModel({
      from: senderId,
      to: conversation._id,
      newMessage
    });

    await message.save();

    conversation.messages.push(newMessage);
    await conversation.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}