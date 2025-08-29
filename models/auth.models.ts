import { prisma } from "../server";


export class AuthModel {
    static async findByEmail(email: string){
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    static async updateLastLogin(userId: string){
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                lastLogin: new Date(),
                updated_at: new Date()
            }
        })
    }

    static async createUser(email: string){
        return await prisma.user.create({
            data: {
                email,
                isActivated: false,
                name: "",
                suspended: false,
                role: "Student",
            }
        })
    }

    static async activateUser(userId: string){
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isActivated: true
            }
        })
    }

}