import request from 'supertest';
import app from '../app';

describe('Testes de carga das rotas da API', () => {
    it('Deve lidar com uma carga de requisições sem problemas', async () => {
        const requestPromises = [];
        const requestCount = 100;

        for (let i = 0; i < requestCount; i++) {
            requestPromises.push(request(app).get('/inserir-comics'));
        }

        const responses = await Promise.all(requestPromises);

        responses.forEach(response => {
            
            expect(response.status).toBe(200);
        });
    }, 10000); 
});
