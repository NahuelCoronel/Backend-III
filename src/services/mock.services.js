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

class MockService {
  getMockUsers(qty = 10) {
    const users = [];
    for (let i = 0; i < qty; i++) {
      users.push(generateMockUser());
    }
    return users;
  }

  getMockProducts(qty = 10) {
    const products = [];
    for (let i = 0; i < qty; i++) {
      products.push(generateMockProduct());
    }
    return products;
  }

  async seedDatabase(qty = 10) {
    // 1. Generar e insertar usuarios (clientes y repartidores balanceados)
    const usersData = [];
    for (let i = 0; i < qty; i++) {
      const role = i % 2 === 0 ? ROLES.CUSTOMER : ROLES.DRIVER;
      usersData.push(generateMockUser(role));
    }
    const insertedUsers = await UserModel.insertMany(usersData);

    const clients = insertedUsers.filter((u) => u.role === ROLES.CUSTOMER);
    const drivers = insertedUsers.filter((u) => u.role === ROLES.DRIVER);

    // 2. Generar e insertar productos
    const productsData = [];
    for (let i = 0; i < qty; i++) {
      productsData.push(generateMockProduct());
    }
    const insertedProducts = await ProductModel.insertMany(productsData);

    // 3. Generar e insertar órdenes (asociando clientes y productos guardados)
    const ordersData = [];
    for (let i = 0; i < qty; i++) {
      const client = clients[i % clients.length];
      // Seleccionamos 1 a 3 productos al azar de los recién creados
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
  }
}

export default new MockService();
