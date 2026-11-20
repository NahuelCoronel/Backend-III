import { Router } from 'express';
import ordersController from '../controllers/orders.controller.js';
import { uploader } from '../middlewares/multer.middleware.js';

const router = Router();

router.get('/', (req, res, next) => ordersController.getAll(req, res, next));
router.get('/:id', (req, res, next) => ordersController.getById(req, res, next));
router.post('/', (req, res, next) => ordersController.create(req, res, next));
router.post(
  '/:oid/receipt',
  uploader.single('receipt'),
  ordersController.uploadReceipt
);


export default router;
