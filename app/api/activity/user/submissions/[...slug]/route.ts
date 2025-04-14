import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:any) {
    const param = await params;
    try {
        const prisma = globalPrismaClient;
        const userActivity = await prisma.user.findUnique({
            where: {
                id: param.slug[0]
            },
            select: {
                acceptedEasy: true,
                totalEasy: true,
                acceptedMedium: true,
                totalMedium: true,
                acceptedHard: true,
                totalHard: true,
                acceptedSubmissions: true,
                totalSubmissions: true
            }
        })
        return NextResponse.json(userActivity)
    } catch (error) {
        return NextResponse.json(error)
        
    }
}