import personagensSchema from "../schema/personagens.schema";
import { personagensType } from "../types/personagens.type";

class personagensService{

    async create(personagensType:personagensType){
        try{
            const personagens = await personagensSchema.create(personagensType)
            return personagens
        } catch(error){
            console.error(error)
        }
    }


    async findAll(){
        try{
            const personagens = await personagensSchema.find()
            return personagens;
            } catch(error){
            console.error(error);
        }
    }

    async update(id:string, personagens:personagensType){
        try{
            const uptdatedPersonagens= await personagensSchema.findByIdAndUpdate(id,{
                nome: personagens.nome,
                urlImagem: personagens.urlImagem,
                descricacao: personagens.descricacao
            }, {new: true})
                return uptdatedPersonagens;
        }catch(error){
            console.error(error);
        }
    }

    async delete(id : string){
        try{
            const deletedPersonagens = await personagensSchema.findByIdAndDelete(id)
            return "Criador Removido"
        }catch(error){
            console.error(error);
        }
    }

    async buscarPersonagemNome(name:String){
        try{
            const personagem = await personagensSchema.find({nome:name})
            return personagem;
        }catch(error){
            console.error(error);
        }
    }

    async retornarCaminhoImagem(){
        try{
            const personagem = await personagensSchema.find({}, {urlImagem:1})
            return personagem;
        }catch(error){
            console.error(error);
        }
    }

}

export default new personagensService();