import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }    const prisma = globalPrismaClient;
    try {
        const boilerPlates = await prisma.problem.findUnique({
            where: {
                problemURL: slug[0]
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