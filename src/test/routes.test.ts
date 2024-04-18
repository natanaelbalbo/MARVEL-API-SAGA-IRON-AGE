import request from 'supertest';
import app from '../app';

describe('Testes end-to-end para as rotas da API', () => {
    it('Deve buscar todos os comics', async () => {
        const response = await request(app).get('/inserir-comics');
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo comic', async () => {
        const newComic = {
            titulo: 'testeRota',
            descricacao: 'testeRotaDesc',
            dataPublicacao: new Date(),
            capa: 'testeCapaRota'
        };
        const response = await request(app).post('/create-comics').send(newComic);
        expect(response.status).toBe(201);
    });

    it('Deve buscar todos os comics', async () => {
        const response = await request(app).get('/comics');
        expect(response.status).toBe(200);
    });

    it('Deve buscar todos os criadores', async () => {
        const response = await request(app).get('/criadores');
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo personagem', async () => {
        const newPersonagem = {
            nome: 'testeRota',
            urlImagem: 'urlTesteROta',
            descricacao: 'descricaoTesteRota'
        };
        const response = await request(app).post('/create-personagens').send(newPersonagem);
        expect(response.status).toBe(201);
    });

    it('Deve buscar os comics por letra', async () => {
        const response = await request(app).get('/buscar-comics-por-letra/A');
        expect(response.status).toBe(200);
    });

    it('Deve buscar os criadores com mais de 20 quadrinhos', async () => {
        const response = await request(app).get('/criadores-mais-de-20-quadrinhos');
        expect(response.status).toBe(200);
    });

    it('Deve buscar todos os criadores', async () => {
        const response = await request(app).get('/inserir-criadores');
        expect(response.status).toBe(200);
    });

    it('Deve criar um novo criador', async () => {
        const newCriador = {
            nome: 'natan',
            funcao: 'autor',
            quadrinhosFeitos: '40'
        };
        const response = await request(app).post('/create-criadores').send(newCriador);
        expect(response.status).toBe(201);
    });

    it('Deve buscar o caminho da imagem do personagem', async () => {
        const response = await request(app).get('/buscar-persogagem-imagem');
        expect(response.status).toBe(200);
    });

    it('Deve buscar os comics por letra', async () => {
        const response = await request(app).get('/buscar-comics-por-letra/A');
        expect(response.status).toBe(200);
    });

    it('Deve buscar os criadores por letra', async () => {
        const response = await request(app).get('/buscar-criador-por-letra/A');
        expect(response.status).toBe(200);
    });

    it('Deve buscar os criadores por função', async () => {
        const response = await request(app).get('/buscar-criadores-funcao/Escritor');
        expect(response.status).toBe(200);
    });

    it('Deve buscar comics com descrição maior que 50 caracteres', async () => {
        const response = await request(app).get('/buscar-comics-descricao-maior-50');
        expect(response.status).toBe(200);
    });

    it('Deve buscar um personagem pelo nome', async () => {
        const response = await request(app).get('/buscar-personagem/TestePersonagem');
        expect(response.status).toBe(200);
    });

    it('Deve buscar um criador pelo nome', async () => {
        const response = await request(app).get('/buscar-criador/TesteCriador');
        expect(response.status).toBe(200);
    });

    it('Deve atualizar um personagem existente', async () => {
        const updatedPersonagem = {
            nome: 'personagemAtualizado',
            urlImagem: 'urlAtualizada',
            descricacao: 'descricaoAtualizada'
        };
        const response = await request(app).put('/personagens/123').send(updatedPersonagem);
        expect(response.status).toBe(200);
    });

    it('Deve atualizar um criador existente', async () => {
        const updatedCriador = {
            nome: 'criadorAtualizado',
            funcao: 'funcaoAtualizada',
            quadrinhosFeitos: '50'
        };
        const response = await request(app).put('/criadores/123').send(updatedCriador);
        expect(response.status).toBe(200);
    });

    it('Deve excluir um personagem existente', async () => {
        const response = await request(app).delete('/personagens/123');
        expect(response.status).toBe(200);
    });

    it('Deve excluir um criador existente', async () => {
        const response = await request(app).delete('/criadores/123');
        expect(response.status).toBe(200);
    });
    
});
