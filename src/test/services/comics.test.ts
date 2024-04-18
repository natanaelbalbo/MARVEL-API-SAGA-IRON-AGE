import comicsService from "../../service/comicsService";
import comicsSchema from "../../schema/comics.schema";

jest.mock('../../src/schema/comics.schema');

describe('Testes para comicsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Teste para a função findAll', () => {
        it('Deve retornar uma lista de comics', async () => {
            const expectedComics = [{ titulo: 'Comic 1' }, { titulo: 'Comic 2' }];
            (comicsSchema.find as jest.Mock).mockResolvedValue(expectedComics);

            const comics = await comicsService.findAll();
            expect(comics).toEqual(expectedComics);
        });

        it('Deve retornar uma lista vazia se não houver comics', async () => {
            (comicsSchema.find as jest.Mock).mockResolvedValue([]);

            const comics = await comicsService.findAll();
            expect(comics).toEqual([]);
        });
    });

    describe('Teste para a função create', () => {
        it('Deve criar um novo comic', async () => {
            const newComic = { 
                titulo: 'teste', 
                descricacao: 'Descrição do Comic', 
                dataPublicacao:  new Date('2022-04-20T00:00:00.000Z'),
                capa: 'caminho/para/imagem.jpg' 
            };
            (comicsSchema.create as jest.Mock).mockResolvedValue(newComic);
    
            const comic = await comicsService.create(newComic);
            expect(comic).toEqual(newComic);
        });
    
        it('Deve lançar um erro ao criar um comic com dados incompletos', async () => {
            const incompleteComic = { descricacao: 'Descrição do Comic erro', 
                                      titulo: 'test',  
                                      dataPublicacao:  new Date('2022-04-20T00:00:00.000Z'),
                                      capa:'caminho/para/imagem.jpg' 

            };
            (comicsSchema.create as jest.Mock).mockRejectedValue(new Error('Dados incompletos'));
    
            await expect(comicsService.create(incompleteComic)).rejects.toThrow('Dados incompletos');
        });
    });

   describe('Teste para a função update', () => {
            it('Deve atualizar um comic existente', async () => {
                const id = '661ebc87a340e0276a143f27';
                const updatedComic = { descricacao: 'Descrição do Comic', 
                                      titulo: 'test',  
                                      dataPublicacao:  new Date('2022-04-20T00:00:00.000Z'),
                                      capa:'caminho/para/imagem.jpg'  };
                const comicAtualizadoMock = { ...updatedComic, _id: id };
    
                (comicsSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(comicAtualizadoMock);
    
                const comicAtualizado = await comicsService.update(id, updatedComic);
    
                expect(comicAtualizado).toEqual(comicAtualizadoMock);
            });
    
            it('Deve retornar null se o comic não for encontrado', async () => {
                const id = '321';
                const updatedComic = { descricacao: 'Descrição do Comic erro', 
                titulo: 'test',  
                dataPublicacao:  new Date('2022-04-20T00:00:00.000Z'),
                capa:'caminho/para/imagem.jpg'  };
    
                (comicsSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    
                const comicAtualizado = await comicsService.update(id, updatedComic);
    
                expect(comicAtualizado).toBeNull();
            });
        });
    
        describe('Teste para a função delete', () => {
            it('Deve deletar um comic existente', async () => {
                const id = '661ebc87a340e0276a143f27';
    
                (comicsSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
    
                const comicDeletado = await comicsService.delete(id);
    
                expect(comicDeletado).toBeTruthy();
            });
    
            it('Deve retornar false se o comic não for encontrado', async () => {
                const id = '42132';
    
                (comicsSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(false);
    
                const comicDeletado = await comicsService.delete(id);
    
                expect(comicDeletado).toBeFalsy();
            });
        });
    });
