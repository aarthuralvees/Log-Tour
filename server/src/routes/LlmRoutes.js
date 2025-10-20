import { Router } from 'express'
import { llmController } from '../controllers/index.js';

const llmRoutes = Router();

llmRoutes.post('/', llmController.createTrip);


export default llmRoutes;