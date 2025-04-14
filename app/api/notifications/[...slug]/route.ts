import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: any) {
    const param = await params;
    try {
        const prisma = globalPrismaClient;
        const userNotifications = await prisma.user.findUnique({
            where: {
                id: param.slug[0]
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