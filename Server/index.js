import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import bcrypt from 'bcrypt'


import connectDb from './Config/dbConnection.js'
import userModel from './model/userSchema.js';
import { generateAuthToken, verifyToken } from './middlewares/jwt.js';
import pokemonModel from './model/pokemonSchema.js';



//////  VARIABLES

const app= express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL



////// Database

connectDb(DATABASE_URL)


//////  CONFIGURATION

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials:true,
}));

app.use(morgan("dev"));
// app.use(express.urlencoded({ extended:false }));
app.use(express.json());


app.post('/login',async(req,res)=>{
    let obj=req.body
    const userExist=await userModel.findOne({email:obj.email})
    if (userExist) {
        const isMatch = await bcrypt.compare(obj.password,userExist.password)
        if (isMatch===true) {
            const token=await generateAuthToken(userExist)
            res.json({status:"success",message:"login successfully" , token:token})
        }else{
            res.json({ "status": "failed", "message": "Password does not match" })
        }
    }else{
        res.json({status:"failed",message:"Email not registered"})
    }
})

app.get('/pokemon',verifyToken,async(req,res)=>{
    try {
    const {page,pagesize}=req.query
    let pg;
    page==1?pg=0:pg=10
    
    const pokemon = await pokemonModel.find({}).skip(pg).limit(pagesize)
    res.json({status:'success',data:pokemon}) 
    } catch (error) {
        res.json({status:'failed',message:error.message}) 
    }
  
})


app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})




