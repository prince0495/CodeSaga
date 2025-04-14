import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const problemURL = body?.problemURL;
    try {
        const prisma = globalPrismaClient;
        const likeCount = await prisma.like.count({
            where: {
                problemURL: problemURL
            }
        })
        const dislikeCount = await prisma.dislike.count({
            where: {
                problemURL: problemURL
            }
        })
        return NextResponse.json({likesCount: likeCount, dislikesCount: dislikeCount})
    } catch (error) {
        return NextResponse.json({error: error})
    }
}