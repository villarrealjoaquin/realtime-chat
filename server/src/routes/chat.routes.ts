import { Router } from "express";
import {
  addContact,
  deleteContact,
  getContact
} from "../controllers/chat.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post('/', validateToken, getContact);
router.post('/add', validateToken, addContact);
router.delete('/:id/:email', validateToken, deleteContact);

export default router;