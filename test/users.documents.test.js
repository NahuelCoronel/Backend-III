import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Test funcional - Carga de archivos y documentos', () => {
  let validUserId;
  let validOrderId;
  const nonExistentId = '652f1a2b3c4d5e6f7a8b9999';

  beforeEach(async () => {
    // 1. Crear usuario de prueba
    const userRes = await request(app)
      .post('/api/users')
      .send({
        firstName: 'Test',
        lastName: 'Multer',
        email: `test_multer_${Date.now()}_${Math.random()}@test.com`,
        password: 'password123'
      });

    const userPayload = userRes.body.data || userRes.body.payload || userRes.body.user || userRes.body;
    validUserId = userPayload._id || userPayload.id;

    // 2. Crear orden de prueba vinculada al usuario
    const orderRes = await request(app)
      .post('/api/orders')
      .send({
        user: validUserId,
        items: [{ product: '652f1a2b3c4d5e6f7a8b9c0f', quantity: 1, price: 100 }],
        total: 100
      });

    const orderPayload = orderRes.body.data || orderRes.body.payload || orderRes.body.order || orderRes.body;
    validOrderId = orderPayload._id || orderPayload.id;
  });

  // 1. Carga exitosa de documento de usuario (200)
  it('POST /api/users/:uid/documents debería subir un archivo correctamente', async () => {
    const response = await request(app)
      .post(`/api/users/${validUserId}/documents`)
      .field('documentType', 'identification')
      .attach('documents', Buffer.from('contenido de prueba'), 'documento-test.pdf');

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
  });

  // 2. Error por archivo faltante (400)
  it('POST /api/users/:uid/documents debería retornar 400 si no se envían archivos', async () => {
    const response = await request(app)
      .post(`/api/users/${validUserId}/documents`)
      .field('documentType', 'identification');

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal('error');
  });

  // 3. Error por tipo de documento inválido (400)
  it('POST /api/users/:uid/documents debería retornar 400 si el documentType no es válido', async () => {
    const response = await request(app)
      .post(`/api/users/${validUserId}/documents`)
      .field('documentType', 'tipo_invalido')
      .attach('documents', Buffer.from('contenido de prueba'), 'documento-test.pdf');

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal('error');
  });

  // 4. Error cuando el usuario no existe (404)
  it('POST /api/users/:uid/documents debería retornar 404 si el usuario no existe', async () => {
    const response = await request(app)
      .post(`/api/users/${nonExistentId}/documents`)
      .field('documentType', 'identification')
      .attach('documents', Buffer.from('contenido de prueba'), 'documento-test.pdf');

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal('error');
  });

  // 5. Carga de comprobante en orden (200)
  it('POST /api/orders/:oid/receipt debería subir el comprobante de entrega', async () => {
    const response = await request(app)
      .post(`/api/orders/${validOrderId}/receipt`)
      .attach('receipt', Buffer.from('comprobante test'), 'recibo.pdf');

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
  });
});
