import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {slug: string[]}}) {
    const param = await params;
    const userId = param.slug[0]
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