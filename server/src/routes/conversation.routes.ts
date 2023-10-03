import { Router } from "express";
import { getChat } from "../controllers/conversation.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post('/:contactId',validateToken, getChat);

export default router;