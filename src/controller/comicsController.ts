import { Request, Response, response } from 'express'
import comicsService from '../service/comicsService';
import axios from 'axios';
import { comicsType } from '../types/comics.type';

class comicsController{

    async buscarComics(req:Request, res:Response){
        try{
            const url = 'https://gateway.marvel.com:443/v1/public/series/29692/comics?apikey=3225e5fbe0231108e10e310623f9b05b&ts=1&hash=fbd76ae8c308e8fb63a6336fea47b269'
            const response = await axios.get(url);
            const data = response.data.data.results;

            for (const dataComics of data){
                const dateObject = dataComics.dates.find((date: any) => date.type === 'onsaleDate');
        
                const dataPublicacao = dateObject ? dateObject.date : null;                
                
                const novaDataComics : comicsType = {
                    titulo: '2020 Iron Age (2020) #1',
                    capa: dataComics.thumbnail.path,
                    descricacao: dataComics.description,
                    dataPublicacao: dataPublicacao
                }; 
                await comicsService.create(novaDataComics);
            }
            return res.status(200).json({ message: 'Comics Criados com sucesso' });
        }catch(error){
            console.error(error);
        }
    }
    
    async create(req:Request, res:Response){
        try{
            const comics = await comicsService.create(req.body)
            res.status(201)
            return res.json(comics)
        }catch(error){
            console.error(error);
        }   
    }

    async findAll(req:Request, res:Response){
        try{
            const comics = await comicsService.findAll()
            res.status(200)
            return res.json(comics);
        }catch(error){
            console.error(error)
        }
    }

    async update(req:Request, res:Response){
        try{
            const comics = await comicsService.update(req.params.id, req.body);
            res.status(201)
            return res.json(comics);
        }catch(error){
            console.error(error)
        }
    }

    async delete(req:Request, res:Response){
        try{
            const comics = await comicsService.delete(req.params.id);
            res.status(201);
            return res.json(comics);
        }catch(error){
            console.error(error);
        }
    }

    async buscarDataPublicao(req:Request, res:Response){
        try{
            const datasPublicacao = await comicsService.datasPublicacao();
            res.status(200);
            return res.json(datasPublicacao);
        }catch(error){
            console.error(error);
        }
    }   

    async buscarComicsPorLetra(req: Request, res: Response) {
        try {
            const letra = req.params.letra;
            const comics = await comicsService.buscarPorLetra(letra);
            res.status(200);
            return res.json(comics);
        } catch (error) {
            console.error(error);
        }
    }

    async buscarPorDescricao(req: Request, res: Response) {
        try {
            const comics = await comicsService.buscarPorDescricao();
            res.status(200).json(comics);
        } catch (error) {
            console.error(error);
        }
    }

}

export default new comicsController()