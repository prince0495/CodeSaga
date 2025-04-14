import { globalPrismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const prisma = globalPrismaClient;
        const easyCount = await prisma.problem.count({
            where: {
                difficulty: 'Easy'
            }
        })
        const mediumCount = await prisma.problem.count({
            where: {
                difficulty: 'Medium'
            }
        })
        const hardCount = await prisma.problem.count({
            where: {
                difficulty: 'Hard'
            }
        })
        const totalCount = easyCount + mediumCount + hardCount;
        return NextResponse.json({totalCount, easyCount, mediumCount, hardCount});
    } catch (error) {
        return NextResponse.json({message: error})
    }
}