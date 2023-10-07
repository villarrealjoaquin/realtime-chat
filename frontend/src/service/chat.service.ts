import { Contact } from "../models/contact.model";
import instance from "./axios.config";

export const getContact = ({ email, id }: { email: string, id: string | undefined }) => instance.post('/', { email, id });

export const addContact = ({ id, contact }: { id: string | undefined, contact: Contact }) => instance.post('/add', { id, contact });

export const deleteContact = (id: string, email: string) => instance.delete(`/${id}/${email}`);