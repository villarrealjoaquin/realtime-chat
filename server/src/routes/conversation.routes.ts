import { Router } from "express";
import { addMessage, getChat } from "../controllers/conversation.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.get('/conversation/:contactId',validateToken, getChat);
router.post('/conversation',validateToken, addMessage);

export default router;