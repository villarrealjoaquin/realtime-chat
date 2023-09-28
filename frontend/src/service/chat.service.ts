import axios from "axios";

export const getContact = (email: { email: string }) => axios.post('http://localhost:3000', email);
export const getContacts = () => axios.get('http://localhost:3000/home');
