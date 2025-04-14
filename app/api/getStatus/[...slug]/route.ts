import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const prisma = globalPrismaClient;
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: slug[0]
            },
            select: {
                solvedProblems: true,
                acceptedSubmissions: true,
                totalSubmissions: true
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json("Error: " + error)
    }

}