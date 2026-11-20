import ordersService from '../services/orders.services.js';
import { HTTP_STATUS, DOCUMENT_TYPES } from '../constants/index.js';

class OrdersController {
  async getAll(req, res, next) {
    try {
      const orders = await ordersService.getAllOrders();
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: orders });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await ordersService.getOrderById(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newOrder = await ordersService.createOrder(req.body);
      return res.status(HTTP_STATUS.CREATED).json({ status: 'success', data: newOrder });
    } catch (error) {
      next(error);
    }
  }

  async uploadReceipt(req, res, next) {
    try {
      const { oid } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(HTTP_STATUS.BAD_REQUEST || 400).json({
          status: 'error',
          message: 'No se recibió el archivo del comprobante de entrega'
        });
      }

      const receiptMetadata = {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        documentType: DOCUMENT_TYPES.DELIVERY_RECEIPT,
        uploadedAt: new Date()
      };

      const updatedOrder = await ordersService.setDeliveryReceipt(oid, receiptMetadata);
      
      req.logger?.info(`[UPLOAD] Comprobante de entrega registrado para la orden ${oid} - Archivo: ${receiptMetadata.filename}`);

      return res.status(HTTP_STATUS.OK).json({
        status: 'success',
        message: 'Comprobante de entrega registrado con éxito',
        payload: updatedOrder.deliveryReceipt
      });
    } catch (error) {
      next(error);
    }
  }

}

export default new OrdersController();
