import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de pruebas funcionales: Orders (/api/orders)', () => {
  let createdUserId;

  // Creamos un usuario de prueba para asociarlo a las órdenes
  beforeEach(async () => {
    const userRes = await request(app)
      .post('/api/users')
      .send({
        firstName: 'Order',
        lastName: 'Buyer',
        email: 'order.buyer@example.com',
        password: 'password123',
      });
    createdUserId = userRes.body.data?._id || '652f1a2b3c4d5e6f7a8b9c0d';
  });

  it('GET /api/orders - Debe responder 200 y listar las órdenes', async () => {
    const response = await request(app).get('/api/orders');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status', 'success');
    expect(response.body).to.have.property('data').that.is.an('array');
  });

  it('POST /api/orders - Debe responder 201 y crear una orden válida', async () => {
    const newOrder = {
      user: createdUserId,
      items: [
        {
          product: '652f1a2b3c4d5e6f7a8b9c0f',
          quantity: 2,
          price: 1500,
        },
      ],
      total: 3000,
    };

    const response = await request(app)
      .post('/api/orders')
      .send(newOrder);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('status', 'success');
    expect(response.body.data).to.have.property('_id');
    expect(response.body.data).to.have.property('total', 3000);
  });

  it('POST /api/orders - Debe responder 400 si faltan campos obligatorios', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({ total: 1000 });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('status', 'error');
  });

  it('GET /api/orders/:id - Debe responder 404 ante una orden inexistente', async () => {
    const nonExistentOrderId = '652f1a2b3c4d5e6f7a8b9999';

    const response = await request(app).get(`/api/orders/${nonExistentOrderId}`);

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status', 'error');
  });
});
