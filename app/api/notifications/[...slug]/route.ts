import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        try {
        const prisma = globalPrismaClient;
        const userNotifications = await prisma.user.findUnique({
            where: {
                id: slug[0]
            },
            select: {
                notifications: {
                    take: 10,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })
        return NextResponse.json(userNotifications)
    } catch (error) {
        return NextResponse.json(error)
        
    }
}