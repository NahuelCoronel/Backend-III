import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de pruebas funcionales: Mocks (/api/mocks)', () => {
  it('GET /api/mocks/users - Debe responder 200 y generar usuarios simulados en memoria', async () => {
    const response = await request(app).get('/api/mocks/users?qty=5');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(5);
  });

  it('GET /api/mocks/products - Debe responder 200 y generar productos simulados en memoria', async () => {
    const response = await request(app).get('/api/mocks/products?qty=3');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(3);
  });

  it('GET /api/mocks/users - Debe responder 400 ante un parámetro qty inválido', async () => {
    const response = await request(app).get('/api/mocks/users?qty=invalido');

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('status', 'error');
  });

  it('POST /api/mocks/seed - Debe responder 201 y persistir datos simulados en la base', async () => {
    const response = await request(app).post('/api/mocks/seed?qty=2');

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('message');
    expect(response.body).to.have.property('insertedUsers');
  });
});
