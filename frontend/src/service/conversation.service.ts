import instance from "./axios.config";

export const getChat = (contactId: string) => instance.get(`/:${contactId}`, { withCredentials: true });