import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: {slug: string[]}}) {
    const param = await params;
    const userId = param.slug[0];
    const language = param.slug[1];
    const problemURL = param.slug[2];
    const prisma = globalPrismaClient;
    try {
        const submissions = await prisma.submission.findMany({
            where: {
                userId: userId,
                language: language,
                problemURL: problemURL,
            },
            select: {
                code: true,
                status: true,
                submittedAt: true,
                language: true
            }
        })
        console.log(submissions);
        return NextResponse.json(submissions)
    } catch (error) {
        return NextResponse.json({'message': 'Error fetching submissions'}, {status: 500 })
    }
}