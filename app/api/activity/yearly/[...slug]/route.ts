import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> } ) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    const date = new Date();
    const currenYear = date.getUTCFullYear();

    try {
        const prisma = globalPrismaClient;
        const yearlyActivity = [];
        for(let month=0; month < 12; month++) {
            const firstDayOfMonth = new Date(Date.UTC(currenYear, month, 1));
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
                        select: {
                            acceptedSubmissions: true,
                            totalSubmissions: true,
                            date: true
                        },
                        orderBy: {
                            date: 'asc'
                        }
                    }
                }
            })
            yearlyActivity.push(monthlyActivity)
        }
        return NextResponse.json(yearlyActivity)
    } catch (error) {
        return NextResponse.json({message: error})
    }
}