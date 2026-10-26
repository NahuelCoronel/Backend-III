import { Router } from 'express';
import usersController from '../controllers/users.controllers.js';

const router = Router();

router.get('/', (req, res, next) => usersController.getAll(req, res, next));
router.get('/:id', (req, res, next) => usersController.getById(req, res, next));
router.post('/', (req, res, next) => usersController.create(req, res, next));
router.put('/:id', (req, res, next) => usersController.update(req, res, next));
router.delete('/:id', (req, res, next) => usersController.delete(req, res, next));

export default router;
