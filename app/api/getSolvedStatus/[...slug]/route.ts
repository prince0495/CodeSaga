import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const userId: string = slug[0];
    const problemURL: string = slug[1];
    try {
        const prisma = globalPrismaClient;
        const problems = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                solvedProblems: true
            }
        })
        if(!problems || problems === null || problems.solvedProblems === undefined ) {
            return NextResponse.json({isSolved: false})
        }
        for(const problem of problems.solvedProblems) {
            if(problem === problemURL) {
                return NextResponse.json({isSolved: true})
            }
        }
        return NextResponse.json({ isSolved: false })
    } catch (error) {
        return NextResponse.json({isSolved: false, error: error})
    }
}