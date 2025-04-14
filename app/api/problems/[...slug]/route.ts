import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        try {
        const prisma = globalPrismaClient;
        const problem = await prisma.problem.findUnique({
            where: {
                problemURL: slug[0]
            },
            select: {
                acceptedSubmissions: true,
                totalSubmissions: true
            }
        })
        return NextResponse.json(problem)
    } catch (error) {
        return NextResponse.json({error: error})
        
    }
}
