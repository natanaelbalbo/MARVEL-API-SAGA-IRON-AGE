import { Request, Response } from 'express';
import criadoresController from '../../controller/criadoresController';

describe('Testes para criadoresController', () => {
    describe('Teste para a função findAll', () => {
        it('Deve retornar uma lista de criadores', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([]));
        });

        it('Deve retornar uma lista vazia se não houver criadores', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('Teste para a função create', () => {
        it('Deve criar um novo criador', async () => {
            const req = {
                body: { nome: 'Novo Criador', funcao: 'Escritor', quadrinhosFeitos: '25' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Criador criado com sucesso' });
        });

        it('Deve retornar uma mensagem de erro se os dados do criador estiverem incompletos', async () => {
            const req = {
                body: { funcao: 'Escritor', quadrinhosFeitos: '22' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Dados incompletos para criar o criador' });
        });
    });

    describe('Teste para a função update', () => {
        it('Deve atualizar um criador existente', async () => {
            const req = {
                params: { id: '66200a1de803c972d03bffac' },
                body: { nome: 'Criador Atualizado', funcao: 'Editor' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.update(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Criador atualizado com sucesso' });
        });

        it('Deve retornar uma mensagem de erro se o criador não for encontrado', async () => {
            const req = {
                params: { id: '999' },
                body: { nome: 'Criador Atualizado', funcao: 'Editor' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.update(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Criador não encontrado' });
        });
    });

    describe('Teste para a função delete', () => {
        it('Deve excluir um criador existente', async () => {
            const req = {
                params: { id: '66200a1de803c972d03bffac1' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.delete(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Criador excluído com sucesso' });
        });

        it('Deve retornar uma mensagem de erro se o criador não for encontrado', async () => {
            const req = {
                params: { id: '999' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.delete(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Criador não encontrado' });
        });
    });
});
