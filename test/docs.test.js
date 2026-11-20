import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Suite de pruebas funcionales: Documentación Swagger (/api/docs)', () => {
  it('GET /api/docs/ - Debe responder 200 (o 301/302 de redirección) y servir la UI de Swagger', async () => {
    const response = await request(app).get('/api/docs/');

    expect([200, 301, 302]).to.include(response.status);
  });

  it('GET /api/ruta-inexistente - Debe responder 404 ante endpoints no definidos', async () => {
    const response = await request(app).get('/api/ruta-totalmente-inexistente');

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status', 'error');
  });
});
