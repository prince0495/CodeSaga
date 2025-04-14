import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: any) {
    const param = await params;
    const body = await req.json();
    try {
        const prisma = globalPrismaClient;
        const recipientId: string = param.slug[0];
        const requesterId: string = body.requesterId;
        const friendship1 = await prisma.friendship.findUnique({
            where: {
                requesterId_recipientId: {
                    requesterId: requesterId,
                    recipientId: recipientId
                }
            }
        })
        if(friendship1) {
            await prisma.friendship.delete({
                where: {
                    requesterId_recipientId: {
                        requesterId: requesterId,
                        recipientId: recipientId
                    }
                }
            })
            return NextResponse.json({
                message: "Successfully removed friendship",
            })
        }
        const friendship2 = await prisma.friendship.findUnique({
            where: {
                requesterId_recipientId: {
                    requesterId: recipientId,
                    recipientId: requesterId
                }
            }
        })
        if(friendship2) {
            await prisma.friendship.delete({
                where: {
                    requesterId_recipientId: {
                        requesterId: recipientId,
                        recipientId: requesterId
                    }
                }
            })
            return NextResponse.json({
                message: "Successfully removed friendship",
            })
        }
        return NextResponse.json({
            message: "Successfully removed friendship",
        })
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}