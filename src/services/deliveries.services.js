import Delivery from '../models/delivery.model.js';
import { EErrors } from './errors/enum.js';

class DeliveriesService {
  async getAllDeliveries() {
    return await Delivery.find().populate('order');
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
