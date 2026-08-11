import request from 'supertest';
import * as crypto from 'crypto';

const baseUrl = 'http://localhost:8080';
const secret = 'webhook-secret-2024';

describe('TC04 - Webhook', () => {
  
  test('POST /webhooks/catalog com HMAC correto DEVE retornar 200 (sucesso)', async () => {
    // Payload exato que usei no Postman
    const payload = {
      event: 'service.updated',
      service_id: '123',
      timestamp: '2026-08-04T12:00:00Z'
    };

    // Converte o body para string
    const payloadString = JSON.stringify(payload);
    
    // Calcula o HMAC-SHA256 usando a chave secreta
    const hmac = crypto.createHmac('sha256', secret)
                       .update(payloadString)
                       .digest('hex');

    // Faz a requisição com o header correto
    const response = await request(baseUrl)
      .post('/api/v1/webhooks/catalog')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('X-Signature-256', `sha256=${hmac}`);

    // Com a chave certa, a API DEVE processar 200 ou 201
    // Esse teste vai passar provando que a funcionalidade base existe
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('accepted');
  });

});