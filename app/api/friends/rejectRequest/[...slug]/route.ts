import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const body = await req.json();
    try {
        const prisma = globalPrismaClient;
        const recipientId: string = slug[0];
        const requesterId: string = body.requesterId;
        const friendship = await prisma.friendship.findUnique({
            where: {
                requesterId_recipientId: {
                    requesterId: requesterId,
                    recipientId: recipientId
                }
            }, 
            select: {
                status: true
            }
        })
        if(friendship) {
            if(friendship.status === 'Pending') {
                await prisma.friendship.delete({
                    where: {
                        requesterId_recipientId: {
                            requesterId: requesterId,
                            recipientId: recipientId
                        }
                    }
                })
                return NextResponse.json({
                    message: 'Friendship rejected successfully!'
                })
            }
            else {
                return NextResponse.json({
                    message: 'You are already friends'
                })
            }
        }
        return NextResponse.json({message: 'Friendship rejected successfully!'})
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}