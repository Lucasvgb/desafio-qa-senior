import request from 'supertest';

// Configuração base da API
const baseUrl = 'http://localhost:8080';
const token = 'qa-challenge-token';

describe('SUITE 1: Testes do BUG-004 (ID Inválido)', () => {
  
  test('GET /services/999999 deve retornar 404 (atualmente retorna 500 - BUG CONFIRMADO)', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/services/999999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test('GET /services/s001 (ID válido) deve retornar 200', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/services/s001')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Verifica se o ID veio correto no corpo da resposta
    expect(response.body.id).toBe('s001');
  });

});