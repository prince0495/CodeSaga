import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:any) {
    const param = await params;
    const userId = param.slug[0];
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