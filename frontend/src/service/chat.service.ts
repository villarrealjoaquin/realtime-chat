import axios from "axios";
import { Contact } from "../pages/private/Home/Home";

export const getContact = ({ email, id }: { email: string, id: string | undefined }) => axios.post('http://localhost:3000/home', { email, id });

export const addContact = ({ id, contact }: { id: string | undefined, contact: Contact }) => axios.post('http://localhost:3000/home/add', { id, contact });

export const deleteContact = (id:string) => axios.delete(`http://localhost:3000/home/${id}`);