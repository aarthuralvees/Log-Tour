import { Router } from 'express';
import llmRoutes from './LlmRoutes.js'
import userRoutes from './userRoutes.js';
import tripRoutes from './tripRouts.js';

const router = Router();

router.use('/llm', llmRoutes);
router.use('/user', userRoutes);
router.use('/trips', tripRoutes);

export default router;