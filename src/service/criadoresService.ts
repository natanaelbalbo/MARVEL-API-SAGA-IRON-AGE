import criadoresSchema from "../schema/criadores.schema";
import { criadoresType } from "../types/criadores.type";

class criadoresService{

    async create(criadoresType:criadoresType){
        try{
            const criadores = await criadoresSchema.create(criadoresType)
            return criadores
        } catch(error){
            console.error(error)
        }
    }


    async findAll(){
        try{
            const criadores = await criadoresSchema.find()
            return criadores;
            } catch(error){
            console.error(error);
        }
    }

    async update(id:string, criadores:criadoresType){
        try{
            const uptdatedCriadores= await criadoresSchema.findByIdAndUpdate(id,{
                nome: criadores.nome,
                funcao: criadores.funcao,
                quadrinhosFeitos: criadores.quadrinhosFeitos
            }, {new: true})
                return uptdatedCriadores;
        }catch(error){
            console.error(error);
        }
    }

    async delete(id : string){
        try{
            const deletedCriadores = await criadoresSchema.findByIdAndDelete(id)
            return "Criador Removido"
        }catch(error){
            console.error(error);
        }
    }

    async findCriadoresComMaisDeVinteQuadrinhos() {
        try {
            const criadores = await criadoresSchema.find({ quadrinhosFeitos: { $gt: 20 } });
            return criadores;
        } catch (error) {
            console.error(error);
        }
    }

    async buscarPorLetra(letra: string){
        try {
            const criadores = await criadoresSchema.find({ nome: { $regex: `^${letra}`, $options: 'i' } });
            return criadores;
        } catch (error) {
            console.error(error);
        }
    }

    async buscarPorFuncao(funcao: string) {
        try {
            const criadores = await criadoresSchema.find({ funcao:funcao });
            return criadores;
        } catch (error) {
            console.error(error);
        }
    }

}

export default new criadoresService();