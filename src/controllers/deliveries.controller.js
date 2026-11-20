import deliveriesService from '../services/deliveries.services.js';
import { HTTP_STATUS } from '../constants/index.js';

class DeliveriesController {
  async getAll(req, res, next) {
    try {
      const deliveries = await deliveriesService.getAllDeliveries();
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: deliveries });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const delivery = await deliveriesService.getDeliveryById(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: delivery });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newDelivery = await deliveriesService.createDelivery(req.body);
      return res.status(HTTP_STATUS.CREATED).json({ status: 'success', data: newDelivery });
    } catch (error) {
      next(error);
    }
  }
}

export default new DeliveriesController();
