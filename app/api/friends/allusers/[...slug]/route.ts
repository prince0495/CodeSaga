import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = globalPrismaClient;
export async function GET(req: NextRequest, {params}: any) {
    const param = await params;
    try {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: param.slug[0]
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
export async function  POST(req: NextRequest, {params}: any) {
    const param = await params;
    const body = await req.json()
    try {
        const filteredUsers = await prisma.user.findMany({
            where: {
                id: {
                    not: param.slug[0]
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