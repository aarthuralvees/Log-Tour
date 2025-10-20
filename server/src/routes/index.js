import { Router } from 'express';
import llmRoutes from './LlmRoutes.js'

const router = Router();

router.use( '/llm', llmRoutes)

export default router;