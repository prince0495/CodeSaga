import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const userId = slug[0];
    
    try {
        const prisma = globalPrismaClient;
        const info = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                acceptedEasy: true,
                acceptedMedium: true,
                acceptedHard: true,
                acceptedSubmissions: true,
                duplicateAcceptedSubmissions: true,
                totalSubmissions: true,
                duplicateTotalSubmissions: true
            }
        })
        return NextResponse.json(info)
    } catch (error) {
        return NextResponse.json(error)
    }
}