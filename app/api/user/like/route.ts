import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const userId = body.userId;
    const problemURL = body.problemURL;
    try {
        const prisma = globalPrismaClient;
        const alreadyDisliked = await prisma.dislike.findUnique({
            where: {
                userId_problemURL: {
                    userId: userId, problemURL: problemURL
                }
            }
        })
        if(alreadyDisliked) {
            await prisma.dislike.delete({where: {userId_problemURL: {userId: userId, problemURL: problemURL}}})
        }
        const alreadyLiked = await prisma.like.findUnique({
            where: {
                userId_problemURL: {
                    userId: userId,
                    problemURL: problemURL
                }
            }
        })
        if(alreadyLiked) {
            await prisma.like.delete({where: {userId_problemURL: { userId, problemURL}} })
            return NextResponse.json({message: "Already Liked"})
        }
        const liked = await prisma.like.create({
            data: {userId: userId, problemURL: problemURL}
        })
        return NextResponse.json({message: "Liked"})
    } catch (error) {
        return NextResponse.json({error: error})
    }
}