import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from './env.config.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShipNow API - Documentación Técnica',
      version: '1.0.0',
      description: 'API REST para gestión de logística, envíos, usuarios y pedidos con ShipNow.',
    },
    servers: [
      {
        url: `http://localhost:${config.port || 8080}`,
        description: 'Servidor Local de Desarrollo',
      },
    ],
    tags: [
      { name: 'Users', description: 'Operaciones sobre usuarios' },
      { name: 'Orders', description: 'Gestión de pedidos' },
      { name: 'Deliveries', description: 'Seguimiento y gestión de entregas' },
      { name: 'Mocks', description: 'Generación de datos mock para testing' },
      { name: 'Logger', description: 'Testeo de niveles y persistencia de logs' },
    ],
    components: {
      schemas: {
        // Schema de Error idéntico a lo que responde tu errorHandler
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            error: { type: 'string', example: 'InvalidIdError' },
            message: { type: 'string', example: 'El identificador proporcionado no tiene un formato válido' },
            cause: { type: 'string', nullable: true, example: null },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0d' },
            firstName: { type: 'string', example: 'Juan' },
            lastName: { type: 'string', example: 'Pérez' },
            email: { type: 'string', example: 'juan.perez@example.com' },
            role: { type: 'string', example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: { type: 'string', example: 'Juan' },
            lastName: { type: 'string', example: 'Pérez' },
            email: { type: 'string', example: 'juan.perez@example.com' },
            password: { type: 'string', example: '123456' },
            role: { type: 'string', example: 'user' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0e' },
            user: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0d' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0f' },
                  quantity: { type: 'integer', example: 2 },
                  price: { type: 'number', example: 1500 },
                },
              },
            },
            total: { type: 'number', example: 3000 },
            status: { type: 'string', example: 'pending' },
          },
        },
        OrderInput: {
          type: 'object',
          required: ['user', 'items', 'total'],
          properties: {
            user: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0d' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['product', 'quantity', 'price'],
                properties: {
                  product: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0f' },
                  quantity: { type: 'integer', example: 2 },
                  price: { type: 'number', example: 1500 },
                },
              },
            },
            total: { type: 'number', example: 3000 },
          },
        },
        Delivery: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c10' },
            order: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0e' },
            trackingCode: { type: 'string', example: 'TRK-987654321' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string', example: 'Av. Corrientes 1234' },
                city: { type: 'string', example: 'CABA' },
                zipCode: { type: 'string', example: '1043' },
              },
            },
            status: { type: 'string', example: 'in_transit' },
          },
        },
        DeliveryInput: {
          type: 'object',
          required: ['order', 'trackingCode', 'address'],
          properties: {
            order: { type: 'string', example: '652f1a2b3c4d5e6f7a8b9c0e' },
            trackingCode: { type: 'string', example: 'TRK-987654321' },
            address: {
              type: 'object',
              required: ['street', 'city', 'zipCode'],
              properties: {
                street: { type: 'string', example: 'Av. Corrientes 1234' },
                city: { type: 'string', example: 'CABA' },
                zipCode: { type: 'string', example: '1043' },
              },
            },
          },
        },
      },
    },
  },
  // Indicamos que lea anotaciones de todos los routers
  apis: ['./src/docs/**/*.yaml'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerSpecs);
