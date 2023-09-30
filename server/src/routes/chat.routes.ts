import { Router } from "express";
import {
  addContact,
  deleteContact,
  getContact
} from "../controllers/chat.controller";

const router = Router();

// router.post('/', validateToken, getContact);
// router.post('/', validateToken, addContact);
// router.get('/contacts', validateToken, getDataOfUser);

router.post('/', getContact);
router.post('/add', addContact);
router.delete('/:id', deleteContact);

export default router;