import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de pruebas funcionales: Users (/api/users)', () => {
  const mockUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
    password: 'password123',
    role: 'user',
  };

  it('GET /api/users - Debe responder 200 y devolver un array de usuarios', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status', 'success');
    expect(response.body).to.have.property('data').that.is.an('array');
  });

  it('POST /api/users - Debe responder 201 y crear un usuario con datos válidos', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(mockUser);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('status', 'success');
    expect(response.body.data).to.be.an('object');
    expect(response.body.data).to.have.property('_id');
    expect(response.body.data).to.have.property('email', mockUser.email);
    expect(response.body.data).to.have.property('firstName', mockUser.firstName);
  });

  it('POST /api/users - Debe responder 400 ante datos incompletos o inválidos', async () => {
    const invalidUser = { firstName: 'SoloNombre' };

    const response = await request(app)
      .post('/api/users')
      .send(invalidUser);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('status', 'error');
    expect(response.body).to.have.property('message');
  });

  it('GET /api/users/:id - Debe responder 404 ante un ID inexistente', async () => {
    const nonExistentId = '652f1a2b3c4d5e6f7a8b9999';

    const response = await request(app).get(`/api/users/${nonExistentId}`);

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status', 'error');
  });
});
