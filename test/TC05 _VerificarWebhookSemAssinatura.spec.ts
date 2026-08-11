import request from 'supertest';

const baseUrl = 'http://localhost:8080';

describe('TC05 - Webhook HMAC (BUG - Crítico)', () => {
  
  test('POST /webhooks/catalog sem o header X-Signature-256 DEVERIA retornar 401/403, mas retorna 200', async () => {
    const payload = {
      event: 'service.updated',
      service_id: '123',
      timestamp: new Date().toISOString()
    };

    const response = await request(baseUrl)
      .post('/api/v1/webhooks/catalog')
      .send(payload)
      .set('Content-Type', 'application/json');

    // Critério de Aceite: 401 Unauthorized ou 403.
    // Resultado Atual: 200 OK (aceita qualquer coisa).
    // Vai falhar provando o bug.
    expect(response.status).toBe(401);
  });

  // Teste bônus - Verificar que com a chave errada também vai passa 
  test('POST /webhooks/catalog com chave HMAC errada DEVERIA retornar 403, mas retorna 200', async () => {
    const payload = { event: 'test', service_id: 'x' };
    const wrongSecret = 'sha256=qualquer_coisa_falsa';

    const response = await request(baseUrl)
      .post('/api/v1/webhooks/catalog')
      .send(payload)
      .set('X-Signature-256', wrongSecret);

    // Se retornar 200, a API nem chegou a validar a chave
    expect(response.status).toBe(403);
  });

});