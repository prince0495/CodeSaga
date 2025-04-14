import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> } ) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const userId = slug[0];
    const language = slug[1];
    const problemURL = slug[2];
    if (!userId || !language || !problemURL) {
    return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
    }
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
        return NextResponse.json({'message': 'Error fetching submissions', error: error}, {status: 500 })
    }
}