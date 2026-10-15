import { fakerES as faker } from '@faker-js/faker';
import { ROLES, ORDER_STATUS, ORDER_PRIORITY, DELIVERY_STATUS, PRODUCT_STATUS } from '../constants/index.js';
import bcrypt from 'bcrypt';

const DEFAULT_PASSWORD = 'coder123';

const hashedPassword = bcrypt.hashSync(DEFAULT_PASSWORD, 10);

export const generateMockUser = (customRole = null) => {
  const allowedRoles = [ROLES.CUSTOMER, ROLES.DRIVER];
  const role = customRole || faker.helpers.arrayElement(allowedRoles);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: hashedPassword,
    role
  };
};

export const generateMockProduct = () => {


  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 100, max: 15000 })),
    stock: faker.number.int({ min: 5, max: 100 }),
    status : faker.helpers.arrayElement(Object.values(PRODUCT_STATUS))
  };
};

export const generateMockOrder = (userId, products = []) => {
  const calculatedTotal = products.length > 0
    ? products.reduce((acc, p) => acc + (p.price || 1000), 0)
    : parseFloat(faker.commerce.price({ min: 1000, max: 30000 }));

  return {
    orderNumber: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
    user: userId,
    products: products.map((p) => ({
      product: p._id,
      quantity: faker.number.int({ min: 1, max: 3 })
    })),
    totalAmount: calculatedTotal,
    status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
    priority: faker.helpers.arrayElement(Object.values(ORDER_PRIORITY))
  };
};

export const generateMockDelivery = (orderId, driverId = null) => {
  return {
    trackingCode: `TRK-${faker.string.alphanumeric(10).toUpperCase()}`,
    order: orderId,
    driver: driverId,
    status: faker.helpers.arrayElement(Object.values(DELIVERY_STATUS)),
    deliveryAddress: faker.location.streetAddress({ useFullAddress: true })
  };
};
