import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const userId = body?.userId;
    const problemURL = body?.problemURL;
    try {
        const prisma = globalPrismaClient;
        const liked = await prisma.like.findUnique({
            where: {userId_problemURL: {userId: userId, problemURL: problemURL}},
            select: {userId: true}
        })
        const disliked = await prisma.dislike.findUnique({
            where: {userId_problemURL: {userId: userId, problemURL: problemURL}},
            select: {userId: true}
        })
        const alreadyLiked = liked ? true : false;
        const alreadyDisliked = disliked ? true : false;
        return NextResponse.json({alreadyLiked, alreadyDisliked})
    } catch (error) {
        return NextResponse.json({error: error})
    }
}