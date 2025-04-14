import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> } ) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    try {
        const prisma = globalPrismaClient;
        const date = new Date()
        const firstDayOfMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        const monthlyActivity = await prisma.monthlyActivity.findUnique({
            where: {
                userId_date: {
                    userId: slug[0],
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