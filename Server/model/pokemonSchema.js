import mongoose from "mongoose";

const pokemonSchema=new mongoose.Schema({
    name:{type:String},
    attacks:[
        {type:String}
    ],
    abilities:[
        {type:String}
    ],
    image:{type:String}
},
{
    timestamps:true,
}
)

const pokemonModel=mongoose.model('pokemons',pokemonSchema)
export default pokemonModel
