import Delivery from '../models/delivery.model.js';
import { EErrors } from './errors/enum.js';

class DeliveriesService {
  
  async getAllDeliveries({ limit = 20, page = 1 } = {}) {
    const parsedLimit = Math.max(1, Number(limit) || 10);
    const parsedPage = Math.max(1, Number(page) || 1);
    const skip = (parsedPage - 1) * parsedLimit;

    return await Delivery.find()
      .skip(skip)
      .limit(parsedLimit)
      .populate('order');
  }

  

  async getDeliveryById(id) {
    const delivery = await Delivery.findById(id).populate('order');
    if (!delivery) {
      const error = new Error(`Entrega con ID ${id} no encontrada`);
      error.code = EErrors.NOT_FOUND_ERROR;
      throw error;
    }
    return delivery;
  }

  async createDelivery(data) {
    return await Delivery.create(data);
  }
}

export default new DeliveriesService();
