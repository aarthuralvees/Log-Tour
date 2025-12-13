import { Router } from 'express'
import { tripControllers } from '../controllers/index.js';

const tripRoutes = Router();

tripRoutes.post('/', tripControllers.createTrip); // create trip
tripRoutes.put('/userTrips/:userId', tripControllers.getTripsByUser) // get users trips

export default tripRoutes;