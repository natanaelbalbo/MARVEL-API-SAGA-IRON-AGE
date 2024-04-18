import { Request, Response } from 'express';
import personagensService from '../../service/personagensService';
import personagensController from '../../controller/personagensController';
import { personagensType } from '../../types/personagens.type';

jest.mock('../../src/services/personagens.service');

describe('Testes para personagensController', () => {
    
    describe('Teste para a função findAll', () => {
        it('Deve retornar uma lista de personagens', async () => {
            const personagensMock: personagensType[] = [
                { nome: 'Personagem 1', urlImagem: 'url1', descricacao: 'Descrição 1' },
                { nome: 'Personagem 2', urlImagem: 'url2', descricacao: 'Descrição 2' },
            ];
            const req = {} as Request;
            const res = { json: jest.fn() } as unknown as Response;

            (personagensService.findAll as jest.Mock).mockResolvedValue(personagensMock);

            await personagensController.findAll(req, res);

            expect(res.json).toHaveBeenCalledWith(personagensMock);
        });

        it('Deve retornar uma lista vazia se nenhum personagem for encontrado', async () => {
            const req = {} as Request;
            const res = { json: jest.fn() } as unknown as Response;

            (personagensService.findAll as jest.Mock).mockResolvedValue([]);

            await personagensController.findAll(req, res);

            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('Teste para a função create', () => {
        it('Deve criar um novo personagem', async () => {
            const newPersonagem: personagensType = { nome: 'Novo Personagem', urlImagem: 'url', descricacao: 'Nova Descrição' };
            const personagemCriadoMock: personagensType = { ...newPersonagem };
            const req = { body: newPersonagem } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagensService.create as jest.Mock).mockResolvedValue(personagemCriadoMock);

            await personagensController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(personagemCriadoMock);
        });
    });
    
    describe('Teste para a função update', () => {
        it('Deve atualizar um personagem existente', async () => {
            const id = '662006e1e803c972d03bffa7';
            const updatedPersonagem = { nome: 'Personagem Atualizado' };
            const personagemAtualizadoMock = { ...updatedPersonagem, _id: id };
            const req = { params: { id }, body: updatedPersonagem } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagensService.update as jest.Mock).mockResolvedValue(personagemAtualizadoMock);

            await personagensController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(personagemAtualizadoMock);
        });

        it('Deve retornar status 404 se o personagem não for encontrado', async () => {
            const id = '662006e1e803c972d03bffa7';
            const updatedPersonagem = { nome: 'Personagem Atualizado' };
            const req = { params: { id }, body: updatedPersonagem } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagensService.update as jest.Mock).mockResolvedValue(null);

            await personagensController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Personagem não encontrado' });
        });
    });

    describe('Teste para a função delete', () => {
        it('Deve deletar um personagem existente', async () => {
            const id = '662006e1e803c972d03bffa7';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagensService.delete as jest.Mock).mockResolvedValue(true);

            await personagensController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Personagem deletado com sucesso' });
        });

        it('Deve retornar status 404 se o personagem não for encontrado', async () => {
            const id = '662006e1e803c972d03bffa7';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagensService.delete as jest.Mock).mockResolvedValue(false);

            await personagensController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Personagem não encontrado' });
        });
    });
});
