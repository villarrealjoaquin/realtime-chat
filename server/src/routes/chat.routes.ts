import { Router } from "express";
import {
  addContact,
  getContact,
  getDataOfUser
} from "../controllers/chat.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

// router.post('/', validateToken, getContact);
// router.post('/', validateToken, addContact);
// router.get('/contacts', validateToken, getDataOfUser);

router.post('/', getContact);
router.post('/', addContact);
router.get('/', getDataOfUser);

export default router;