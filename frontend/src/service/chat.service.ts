import { Contact } from "../pages/private/Home/Home";
import instance from "./axios.config";

export const getContact = ({ email, id }: { email: string, id: string | undefined }) => instance.post('/', { email, id }, { withCredentials: true });

export const addContact = ({ id, contact }: { id: string | undefined, contact: Contact }) => instance.post('/add', { id, contact }, { withCredentials: true });

export const deleteContact = (id: string, email: string) => instance.delete(`/${id}/${email}`, { withCredentials: true });