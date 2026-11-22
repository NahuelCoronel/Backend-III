import Order from '../models/order.model.js';
import { EErrors } from './errors/enum.js';

class OrdersService {
  async getAllOrders({ limit = 20, page = 1 } = {}) {
    const parsedLimit = Math.max(1, Number(limit) || 10);
    const parsedPage = Math.max(1, Number(page) || 1);
    const skip = (parsedPage - 1) * parsedLimit;

    return await Order.find()
      .skip(skip)
      .limit(parsedLimit)
      .populate('user', 'firstName lastName email');
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

    // src/services/orders.services.js
  async setDeliveryReceipt(oid, receiptData) {
    // Usar findByIdAndUpdate en lugar de Order.update
    const updatedOrder = await Order.findByIdAndUpdate(
      oid,
      { deliveryReceipt: receiptData },
      { new: true }
    );

    if (!updatedOrder) {
      const error = new Error(`Orden con ID ${oid} no encontrada`);
      error.name = 'NotFoundError';
      error.code = EErrors.NOT_FOUND_ERROR;
      throw error;
    }

  return updatedOrder;
}


}

export default new OrdersService();
