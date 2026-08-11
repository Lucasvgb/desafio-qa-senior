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
    // Sobe rapido para 50
    { duration: '10s', target: 50 },

    // Sobe para 100 
    { duration: '20s', target: 100 }, 
    
    // Volta
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    // Aceitando até 5% de falhas aqui
    http_req_failed: ['rate<0.05'],    
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/services?page=1&per_page=10`, params);
  check(res, { 'status é 200': (r) => r.status === 200 });
  sleep(0.5);
}