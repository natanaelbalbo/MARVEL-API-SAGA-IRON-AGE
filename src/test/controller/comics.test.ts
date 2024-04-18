import { Request, Response } from 'express';
import comicsController from '../../controller/comicsController';
import comicsService from '../../service/comicsService';

jest.mock('../../src/service/comicsService');

describe('Testes para comicsController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Teste para a função findAll', () => {
        it('Deve retornar uma lista de comics', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            const expectedComics = [{ titulo: 'Comic 1' }, { titulo: 'Comic 2' }];
            (comicsService.findAll as jest.Mock).mockResolvedValue(expectedComics);

            await comicsController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedComics);
        });

        it('Deve retornar uma lista vazia se não houver comics', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            (comicsService.findAll as jest.Mock).mockResolvedValue([]);

            await comicsController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('Teste para a função create', () => {
        it('Deve criar um novo comic', async () => {
            const req = {
                body: { titulo: 'Comic 1' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            const newComic = { titulo: 'Comic 1' };
            (comicsService.create as jest.Mock).mockResolvedValue(newComic);

            await comicsController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Comic criado com sucesso' });
        });

        it('Deve retornar uma mensagem de erro se os dados do comic estiverem incompletos', async () => {
            const req = {
                body: { descricao: 'Descrição do Comic' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            (comicsService.create as jest.Mock).mockRejectedValue(new Error('Dados incompletos'));

            await comicsController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Dados incompletos para criar o comic' });
        });
    });

    describe('Teste para a função update', () => {
        it('Deve atualizar um comic existente', async () => {
            const id = '661ebe91a340e0276a143f29';
            const updatedComic = { titulo: 'Comic Atualizado' };
            const comicAtualizadoMock = { ...updatedComic, _id: id };
            const req = { params: { id }, body: updatedComic } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicsService.update as jest.Mock).mockResolvedValue(comicAtualizadoMock);

            await comicsController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(comicAtualizadoMock);
        });

        it('Deve retornar status 404 se o comic não for encontrado', async () => {
            const id = '661ebe91a340e0276a143f29';
            const updatedComic = { titulo: 'Comic Atualizado' };
            const req = { params: { id }, body: updatedComic } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicsService.update as jest.Mock).mockResolvedValue(null);

            await comicsController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Comic não encontrado' });
        });
    });

    describe('Teste para a função delete', () => {
        it('Deve deletar um comic existente', async () => {
            const id = '661ebe91a340e0276a143f29';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicsService.delete as jest.Mock).mockResolvedValue(true);

            await comicsController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Comic deletado com sucesso' });
        });

        it('Deve retornar status 404 se o comic não for encontrado', async () => {
            const id = '661ebe91a340e0276a143f29';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicsService.delete as jest.Mock).mockResolvedValue(false);

            await comicsController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Comic não encontrado' });
        });
    });

});