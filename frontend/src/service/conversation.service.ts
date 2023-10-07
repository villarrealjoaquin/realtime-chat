import instance from "./axios.config";

export const getChat = (contactId: string) => instance.get(`/conversation/${contactId}`);

export const addMessage = (newMessage: string, conversationId: string, userId:string | undefined) => instance.post(`/conversation`, { newMessage, conversationId, userId });