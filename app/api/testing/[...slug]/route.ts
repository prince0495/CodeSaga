import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest ,context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const userId = slug[0];
    try {
        const prisma = globalPrismaClient;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error)
    }
}