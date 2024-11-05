import express, {Express, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'; 

const app:Express = express();
const PORT = 3000;
const prisma = new PrismaClient();


app.get('/', (request:Request, response:Response) =>{
    response.send("hi")
});


app.listen(PORT, ()=>{
    console.log("The server is running.....")
});