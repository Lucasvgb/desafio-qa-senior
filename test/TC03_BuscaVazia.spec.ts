import request from 'supertest';

const baseUrl = 'http://localhost:8080';
const token = 'qa-challenge-token';

describe('TC03 - Busca Vazia', () => {
  
  test('POST /search com query vazia ("") retorna 200 e TODOS os serviços', async () => {
    const response = await request(baseUrl)
      .post('/api/v1/services/search')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: "" });

    // Comportamento atual: retorna 200 e lista tudo.
    // Isso não é um bug funcional, mas é um risco para quando a base crescer, documentei na planilha que irei enviar.
    expect(response.status).toBe(200);
    
    // Valida que retornou todos os serviços (total = 11, como vimos no /health)
    expect(response.body.total).toBe(11);
    
    // OBS: Este teste vai passar mesmo.
    // A intenção é documentar que se a base crescer para 1 milhão por exemplo, isso vai quebrar a performance. Isso é um ponto de atenção para o futuro.
  });

});