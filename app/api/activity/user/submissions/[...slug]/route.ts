import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> } ) {

    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }
    try {
        const prisma = globalPrismaClient;
        const userActivity = await prisma.user.findUnique({
            where: {
                id: slug[0]
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