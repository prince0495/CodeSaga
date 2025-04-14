import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: any) {
    const param = await params;
    try {
        const prisma = globalPrismaClient;
        const problem = await prisma.problem.findUnique({
            where: {
                problemURL: param.slug[0]
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
