import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import cors from 'cors';
import userRouter from "../routes/user.routes.ts"
import { PrismaClient } from "@prisma/client";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8001;

export const prisma = new PrismaClient();
const app:Express = express();

async function main(){
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))

    app.listen(PORT,()=>{
        console.log(`⚙️ Server is running at port: ${PORT}`);
    })

    //User Routes
    app.use("/api/v1/users",userRouter)
}


main().then(async() => {
    await prisma.$connect();
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
})