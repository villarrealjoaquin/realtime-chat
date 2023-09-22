import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);

export default router;