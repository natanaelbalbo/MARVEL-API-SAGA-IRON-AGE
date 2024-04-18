import { Schema, model } from 'mongoose'

const comicsSchema = new Schema({
    titulo: String,
    descricacao: String,
    dataPublicacao: Date,
    capa: String
}, { timestamps: true });

export default model("Comics", comicsSchema)