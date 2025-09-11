import express, { Express, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.route";
import offerRouter from "./routes/offer.routes";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8001;

export const prisma = new PrismaClient();
const app: Express = express();

async function main() {
  app.use(json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: [process.env.CORS_ORIGIN || "exp://192.168.1.10:8081"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port: ${PORT}`);
  });

  //Routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter)
  app.use("/api/v1/offer", offerRouter);
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
