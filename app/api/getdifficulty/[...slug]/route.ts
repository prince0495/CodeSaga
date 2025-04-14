import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {slug: string[]}}) {
    const param = await params;
    try {
        const prisma = globalPrismaClient;
        const obj = await prisma.problem.findUnique({
            where: {
                problemURL: param.slug[0]
            },
            select: {
                difficulty: true
            }
        })
        return NextResponse.json(obj)
    } catch (error) {
        return NextResponse.json(error)
    }
}