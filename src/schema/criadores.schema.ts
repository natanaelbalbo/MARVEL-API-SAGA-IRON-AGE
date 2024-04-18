import { Schema, model } from 'mongoose'

const criadoresSchema = new Schema({
    nome: String,
    funcao: String,
    quadrinhosFeitos: String
}, { timestamps: true });

export default model("Criadores", criadoresSchema)