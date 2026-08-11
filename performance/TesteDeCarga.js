import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080';
const TOKEN = 'qa-challenge-token';

const params = {
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export const options = {
  stages: [
    // Sobe para 30 usuários
    { duration: '10s', target: 30 },  

    // Mantém por 20s
    { duration: '20s', target: 30 }, 

     // Desce para 0
    { duration: '5s', target: 0 },    
  ],
  thresholds: {
    // Menos de 1% de falhas
    http_req_failed: ['rate<0.01'],

    // 95% abaixo de 2 segundos
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/services?page=1&per_page=10`, params);
  check(res, {
    'status é 200': (r) => r.status === 200,
    'retornou dados': (r) => r.json('data') !== undefined,
  });
  sleep(Math.random() * 1 + 0.5);
}