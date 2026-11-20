import Order from '../models/order.model.js';
import { EErrors } from './errors/enum.js';

class OrdersService {
  async getAllOrders() {
    return await Order.find().populate('user', 'firstName lastName email');
  }

  async getOrderById(id) {
    const order = await Order.findById(id).populate('user', 'firstName lastName email');
    if (!order) {
      const error = new Error(`Orden con ID ${id} no encontrada`);
      error.code = EErrors.NOT_FOUND_ERROR;
      throw error;
    }
    return order;
  }

  async createOrder(data) {
    return await Order.create(data);
  }
}

export default new OrdersService();
