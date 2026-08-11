import request from 'supertest';

const baseUrl = 'http://localhost:8080';

describe('TC01 - Verificar API', () => {
  
  test('GET /health deve retornar status 200 e confirmar que a API está no ar', async () => {
    const response = await request(baseUrl)
      .get('/health');

    // A API precisa responder com 200 OK
    expect(response.status).toBe(200);
    
    // Validação extra para garantir que o JSON veio com o campo "status" = "ok"
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('version', '1.0.0');
  });

  // Verificar se a API não está devolvendo erro 500
  test('GET /health deve ter tempo de resposta baixo (menos de 100ms)', async () => {
    const start = Date.now();
    await request(baseUrl).get('/health');
    const duration = Date.now() - start;
    
    // Se demorar mais que 100ms, significa que o servidor está sobrecarregado ou o container está lento.
    expect(duration).toBeLessThan(100);
  });

});