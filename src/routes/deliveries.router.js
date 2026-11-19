import { Router } from 'express';
import deliveriesController from '../controllers/deliveries.controller.js';

const router = Router();

router.get('/', (req, res, next) => deliveriesController.getAll(req, res, next));
router.get('/:id', (req, res, next) => deliveriesController.getById(req, res, next));
router.post('/', (req, res, next) => deliveriesController.create(req, res, next));

export default router;
