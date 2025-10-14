import { Router } from 'express';
import TestRoute from './TestRoute.js';
import llmRoutes from './llmRoutes.js';

const router = Router();

router.use( '/test', TestRoute);
router.use( '/llm', llmRoutes)

export default router;