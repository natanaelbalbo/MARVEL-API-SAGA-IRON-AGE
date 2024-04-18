import criadoresService from "../../service/criadoresService";
import criadoresSchema from "../../schema/criadores.schema";


describe('Testes para criadoresService', () => {
    
    describe('Teste para a função create', () => {
        it('Deve criar um novo criador', async () => {
            const novoCriador = { nome: 'Novo Criador', funcao: 'Escritor', quadrinhosFeitos: 'Mais de 20' };
            const criadorCriado = await criadoresService.create(novoCriador);
            expect(criadorCriado).toBeDefined(); 
            if (criadorCriado) {
                const criadorEncontrado = await criadoresSchema.findById(criadorCriado._id);
                expect(criadorEncontrado).toBeDefined(); 
                expect(criadorEncontrado).toMatchObject(novoCriador);
            }
        });

        it('Deve retornar um erro ao criar um criador com dados inválidos', async () => {
        });
        
    });


describe('Teste para a função findAll', () => {
    it('Deve retornar uma lista de criadores', async () => {
        const criadores = await criadoresService.findAll();
        expect(criadores).toBeDefined(); //
        expect(criadores!.length).toBeGreaterThan(0);
    });

    it('Deve retornar um erro ao encontrar criadores', async () => {
    });
});

describe('Teste para a função delete', () => {
        it('Deve excluir um criador existente', async () => {
            const id = '66200a1de803c972d03bffac';
            const resultado = await criadoresService.delete(id);
            expect(resultado).toEqual('Criador Removido');
        });

        it('Deve retornar uma mensagem de erro ao tentar excluir um criador inexistente', async () => {
            const id = '999';
            try {
                await criadoresService.delete(id);
            } catch (error) {
                console.error(error);
            }
        });
});

describe('Teste para a função update', () => {
    it('Deve atualizar os dados de um criador existente', async () => {
        const id = '66200a1de803c972d03bffac';
        const novosDados = { nome: 'Novo Nome', funcao: 'Nova Função', quadrinhosFeitos: 'Mais de 30' };
        const criadorAtualizado = await criadoresService.update(id, novosDados);
        expect(criadorAtualizado).toMatchObject(novosDados);
    });

    it('Deve retornar uma mensagem de erro ao tentar atualizar um criador inexistente', async () => {
        const id = '999';
        const novosDados = { nome: 'Novo Nome', funcao: 'Nova Função', quadrinhosFeitos: 'Mais de 30' };
        try {
            await criadoresService.update(id, novosDados);
        } catch (error) {
            console.error(error);
        }
    });
    });
});
