import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de pruebas funcionales: Logger (/api/loggerTest)', () => {
  it('GET /api/loggerTest - Debe responder 200 y ejecutar el diagnóstico de logs', async () => {
    const response = await request(app).get('/api/loggerTest');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status', 'success');
    expect(response.body).to.have.property('message');
  });
});
