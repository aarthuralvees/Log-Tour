import { Router } from 'express';
import llmRoutes from './llmRoutes.js';

const router = Router();

router.use( '/llm', llmRoutes)

export default router;