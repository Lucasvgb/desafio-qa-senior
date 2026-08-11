import request from 'supertest';

const baseUrl = 'http://localhost:8080';
const token = 'qa-challenge-token';

describe('TC02 - Paginação Inválida (BUG - Médio)', () => {
  
  test('GET /services com page=-1 e per_page=abc DEVERIA retornar 400/422, mas retorna 200', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/services')
      .query({ page: -1, per_page: 'abc' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });


  test('GET /services com parâmetros válidos deve retornar 200', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/services')
      .query({ page: 1, per_page: 5 })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    //5 itens
    expect(response.body.data).toHaveLength(5);
  });
  
  

});