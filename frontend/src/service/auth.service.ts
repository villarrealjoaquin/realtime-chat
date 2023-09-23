import axios from 'axios';
import { Values } from '../context/authContext';
import { instance } from './axios.config';

export const loginUserRequest = (user: Values) => instance.post('/login', user);

export const registerUserRequest = (user: Values) => axios.post('/api/register', user);