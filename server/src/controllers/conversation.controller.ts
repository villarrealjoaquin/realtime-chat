import { Request, Response } from "express";
import conversationModel from "../models/messages.schema";
import { CustomRequest } from "../middlewares/validateToken";

export const getOrCreateConversation = async (user1Id: string, user2Id: string) => {
  try {
    // Busca una conversación existente con los mismos participantes
    const existingConversation = await conversationModel.findOne({
      participants: { $all: [user1Id, user2Id] }
    });

    // Si no se encuentra ninguna conversación, crea una nueva
    if (!existingConversation) {
      const newConversation = new conversationModel({
        participants: [user1Id, user2Id]
      });

      const conversation = await newConversation.save();
      return conversation;
    }

    return existingConversation;
  } catch (error) {
    throw error;
  }
};

export const getChat = async (req: CustomRequest, res: Response) => {
  const { contactId } = req.params;
  const userId = req.user?.id;

  if (typeof userId !== 'string') return res.status(401).json({ message: 'Invalid Type' });

  try {
    const conversation = await getOrCreateConversation(userId, contactId);

    // Carga los mensajes de la conversación
    await conversation.populate('messages');

    // Envía la conversación con los mensajes al cliente
    res.json({ conversation });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}