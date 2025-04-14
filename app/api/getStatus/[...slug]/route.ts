import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:any) {
    const param = await params;
    const prisma = globalPrismaClient;
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: param.slug[0]
            },
            select: {
                solvedProblems: true,
                acceptedSubmissions: true,
                totalSubmissions: true
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json("Error: " + error)
    }

}