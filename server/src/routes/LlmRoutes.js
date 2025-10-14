import { Router } from 'express'
import { llmController } from '../controllers/index.js';

const llmRoutes = Router();

llmRoutes.get('/', llmController.createTrip);


export default llmRoutes;