import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: any) {
    const param = await params;
    let date = new Date()
    let firstDayOfMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
    try {
        const userId = param.slug[0];
        const prisma = globalPrismaClient;
        const monthlyActivity = await prisma.monthlyActivity.findUnique({
            where: {
                userId_date: {
                    userId: userId,
                    date: firstDayOfMonth
                }
            },
            select: {
                dailyActivity: {
                    where: {
                        acceptedSubmissions: {gt: 0}
                    },
                    select: {
                        acceptedSubmissions: true,
                        date: true
                    }
                }
            }
        })
        return NextResponse.json(monthlyActivity)
    } catch (error) {
        return NextResponse.json(error)
    }
}