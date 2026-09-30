import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/', (req, res) => usersController.getAll(req, res));
router.get('/:id', (req, res) => usersController.getById(req, res));
router.post('/', (req, res) => usersController.create(req, res));
router.put('/:id', (req, res) => usersController.update(req, res));
router.delete('/:id', (req, res) => usersController.delete(req, res));

export default router;
