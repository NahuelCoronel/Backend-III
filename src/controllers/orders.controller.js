import ordersService from '../services/orders.service.js';
import { HTTP_STATUS } from '../constants/index.js';

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
}

export default new OrdersController();
