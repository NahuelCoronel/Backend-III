import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';
import OrderModel from '../models/order.model.js';
import DeliveryModel from '../models/delivery.model.js';
import {
  generateMockUser,
  generateMockProduct,
  generateMockOrder,
  generateMockDelivery
} from '../utils/mock.utils.js';
import { ROLES } from '../constants/index.js';
import CustomError from './errors/customError.js';
import { EErrors } from './errors/enum.js';
import { generateMockQtyErrorInfo } from './errors/info.js';

class MockService {
  validateQuantity(qty) {
    if (qty === undefined || qty === null || qty === '') {
      return 10;
    }

    const parsedQty = Number(qty);

    if (isNaN(parsedQty) || !Number.isInteger(parsedQty) || parsedQty <= 0) {
      CustomError.createError({
        name: 'InvalidQuantityError',
        cause: generateMockQtyErrorInfo(qty),
        message: 'La cantidad solicitada debe ser un número entero mayor a 0',
        code: EErrors.INVALID_TYPES_ERROR
      });
    }

    return parsedQty;
  }

  getMockUsers(qty) {
    const validQty = this.validateQuantity(qty);
    const users = [];
    for (let i = 0; i < validQty; i++) {
      users.push(generateMockUser());
    }
    return users;
  }

  getMockProducts(qty) {
    const validQty = this.validateQuantity(qty);
    const products = [];
    for (let i = 0; i < validQty; i++) {
      products.push(generateMockProduct());
    }
    return products;
  }

  async seedDatabase(qty) {
    const validQty = this.validateQuantity(qty);

    try {
      // 1. Generar e insertar usuarios (clientes y repartidores balanceados)
      const usersData = [];
      for (let i = 0; i < validQty; i++) {
        const role = i % 2 === 0 ? ROLES.CUSTOMER : ROLES.DRIVER;
        usersData.push(generateMockUser(role));
      }
      const insertedUsers = await UserModel.insertMany(usersData);

      const clients = insertedUsers.filter((u) => u.role === ROLES.CUSTOMER);
      const drivers = insertedUsers.filter((u) => u.role === ROLES.DRIVER);

      // 2. Generar e insertar productos
      const productsData = [];
      for (let i = 0; i < validQty; i++) {
        productsData.push(generateMockProduct());
      }
      const insertedProducts = await ProductModel.insertMany(productsData);

      // 3. Generar e insertar órdenes (asociando clientes y productos guardados)
      const ordersData = [];
      for (let i = 0; i < validQty; i++) {
        const client = clients[i % clients.length];
        const orderProducts = [
          insertedProducts[Math.floor(Math.random() * insertedProducts.length)]
        ];
        ordersData.push(generateMockOrder(client._id, orderProducts));
      }
      const insertedOrders = await OrderModel.insertMany(ordersData);

      // 4. Generar e insertar entregas (asociando pedidos y repartidores)
      const deliveriesData = [];
      for (let i = 0; i < insertedOrders.length; i++) {
        const order = insertedOrders[i];
        const driver = drivers[i % drivers.length];
        deliveriesData.push(generateMockDelivery(order._id, driver._id));
      }
      const insertedDeliveries = await DeliveryModel.insertMany(deliveriesData);

      return {
        insertedUsers: insertedUsers.length,
        insertedProducts: insertedProducts.length,
        insertedOrders: insertedOrders.length,
        insertedDeliveries: insertedDeliveries.length
      };
    } catch (dbError) {
      if (dbError.code && Object.values(EErrors).includes(dbError.code)) {
        throw dbError;
      }

      CustomError.createError({
        name: 'DatabaseSeedError',
        cause: dbError.message,
        message: 'Ocurrió un error al persistir los datos de prueba en la base de datos',
        code: EErrors.DATABASE_ERROR
      });
    }
  }
}

export default new MockService();

