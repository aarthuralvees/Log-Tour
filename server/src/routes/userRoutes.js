import { Router } from 'express'
import { userControllers } from '../controllers/index.js';

const userRoutes = Router();

userRoutes.post('/', userControllers.createUser);
userRoutes.get('/singleUser/:username', userControllers.getUser);

export default userRoutes;