import { Router } from 'express';
import mockController from '../controllers/mock.controller.js';

const router = Router();

// Endpoints GET (datos simulados sin guardar en BD)
router.get('/users', mockController.getUsers);
router.get('/products', mockController.getProducts);

// Endpoint POST (carga de datos relacionales en MongoDB)
router.post('/seed', mockController.seed);

export default router;
