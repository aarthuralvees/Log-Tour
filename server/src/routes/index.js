import { Router } from 'express';
import llmRoutes from './LlmRoutes.js'
import userRoutes from './userRoutes.js';
import tripRoutes from './tripRouts.js';
import authRouter from './authRoutes.js';
import verifyToken from '../authentication/auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/llm', llmRoutes);
router.use('/user', userRoutes);
router.use('/trips', verifyToken, tripRoutes);

export default router;