import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {slug: string[]}}) {
    const param = await params;
    const prisma = globalPrismaClient;
    try {
        const boilerPlates = await prisma.problem.findUnique({
            where: {
                problemURL: param.slug[0]
            },
            select: {
                boilerPlates: true
            }
        })
        return NextResponse.json(boilerPlates);
    } catch (error) {
        return NextResponse.json({error: error});
    }
}