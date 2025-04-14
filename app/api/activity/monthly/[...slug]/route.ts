import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: {slug: string[]}}) {
    const param = await params;
    try {
        const prisma = globalPrismaClient;
        const date = new Date()
        const firstDayOfMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        const monthlyActivity = await prisma.monthlyActivity.findUnique({
            where: {
                userId_date: {
                    userId: param.slug[0],
                    date: firstDayOfMonth
                }
            },
            select: {
                dailyActivity: {
                    where: {
                        acceptedSubmissions: {
                            gt: 0
                        }
                    },
                    orderBy: {
                        date: 'asc'
                    },
                    select: {
                        acceptedSubmissions: true,
                        totalSubmissions: true,
                        date: true
                    }
                }
            },
        })
        return NextResponse.json(monthlyActivity)
    } catch (error) {
        return NextResponse.json(error)
        
    }
}