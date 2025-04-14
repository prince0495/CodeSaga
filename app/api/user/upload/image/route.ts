import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const imageURL = body?.imageURL;
    const userId = body?.userId;
    try {
        const prisma = globalPrismaClient;
        await prisma.user.update({
            where: {id: userId},
            data: {
                image: imageURL
            }
        })
        return NextResponse.json({message: "Image updated successfully"})
    } catch (error) {
        return NextResponse.json({error: error})
    }
}