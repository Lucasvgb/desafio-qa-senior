import request from 'supertest';

const baseUrl = 'http://localhost:8080';
const token = 'qa-challenge-token';

describe('TC08 - Favoritar Duplicado (BUG-006 - Alta)', () => {
  
  test('Favoritar o mesmo serviço duas vezes deveroa retornar 409/400 na 2ª tentativa, mas retorna 200', async () => {
    const serviceId = 's001';
    const url = `/api/v1/services/${serviceId}/favorite`;

    // 1ª requisição: Vai favoritar com sem problemas
    const firstResponse = await request(baseUrl)
      .post(url)
      .set('Authorization', `Bearer ${token}`);
    
    console.log('Primeira tentativa status:', firstResponse.status);
    // Se a primeira der 500, a API está muito quebrada, mas geralmente dá 200

    // 2ª requisição (a mesma de novo): deveria dar erro de conflito
    const secondResponse = await request(baseUrl)
      .post(url)
      .set('Authorization', `Bearer ${token}`);

    console.log('Segunda tentativa status:', secondResponse.status);

    // Critério de Aceite: A segunda tentativa deve retornar 409
    // ou 400 com mensagem "Item já favoritado" por exemplo.
    // Resultado Atual: 200 OK (aceita duplicado).
    // Vai falhar, provando o bug
    expect(secondResponse.status).toBe(409);
  });

});