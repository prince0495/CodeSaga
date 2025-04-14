import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const userId = slug[0]
    try {
        const prisma = globalPrismaClient;
        const friendships = await prisma.friendship.findMany({
            where: {
                recipientId: userId,
                status: 'Pending'
            },
            select: {
                requester: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        return NextResponse.json(friendships)
    } catch (error) {
        return NextResponse.json({message: error})
    }
}