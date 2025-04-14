import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = globalPrismaClient;
export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }    try {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: slug[0]
                }
            },
            select: {
                id: true,
                name: true,
                image: true
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(error)
        
    }
}
export async function  POST(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    
    const body = await req.json()
    try {
        const filteredUsers = await prisma.user.findMany({
            where: {
                id: {
                    not: slug[0]
                },
                name: {
                    contains: body.searchName,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                name: true,
                image: true
            }
        })
        return NextResponse.json(filteredUsers)
    } catch (error) {
        return NextResponse.json(error)
    }
}