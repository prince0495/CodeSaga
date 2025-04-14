import { globalPrismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const prisma = globalPrismaClient;
        const currentDate= new Date()
        const yesterday = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() - 1));
        const users = await prisma.user.findMany({
            select: {
                id: true,
                currentStreak: true,
                maxStreak: true
            }
        });
        for(const user of users) {
            const dailyActivity = await prisma.dailyActivity.findUnique({
                where: {
                    userId_date: {userId: user.id, date: yesterday}
                }
            })
            const maxStreak = user.currentStreak > user.maxStreak ? user.currentStreak : user.maxStreak;
            if(!dailyActivity) {
                await prisma.user.update({
                    where: {id: user.id},
                    data: {currentStreak: 0, maxStreak: maxStreak}
                })
            }
            else {
                await prisma.user.update({where: {id: user.id}, data: {maxStreak: maxStreak}})
            }
        }
        return NextResponse.json({message: 'Reset successful'})
    } catch (error) {
        return NextResponse.json({message: 'Something went wrong', error: error})
    }
}