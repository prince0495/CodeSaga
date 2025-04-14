import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const date = new Date()
    const firstDayOfMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
    try {
        const userId = slug[0];
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