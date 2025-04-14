import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {slug: string[]}}) {
    const param = await params;
    try {
        const prisma = globalPrismaClient;
        const userId = param.slug[0];
        const userData = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              name: true,
              image: true,
              points: true,
              currentStreak: true,
              maxStreak: true,
              totalSubmissions: true,
              acceptedSubmissions: true,
              dailyActivity: {
                orderBy: { date: 'desc' },
                take: 7, // Fetch last 7 days of activity
                select: {
                  date: true,
                  totalSubmissions: true,
                  acceptedSubmissions: true,
                },
              },
              monthlyActivity: {
                orderBy: { date: 'desc' },
                take: 6, // Fetch last 6 months of activity
                select: {
                  date: true,
                  dailyActivity: {
                    select: {
                      date: true,
                      totalSubmissions: true,
                      acceptedSubmissions: true,
                    },
                  },
                },
              },
              friendsInitiated: {
                where: {
                  status: 'Accepted'
                },
                select: {
                  recipient: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      points: true,
                      currentStreak: true,
                      maxStreak: true,
                      totalSubmissions: true,
                      acceptedSubmissions: true,
                      dailyActivity: {
                        orderBy: { date: 'desc' },
                        take: 7,
                        select: {
                          date: true,
                          totalSubmissions: true,
                          acceptedSubmissions: true,
                        },
                      },
                      monthlyActivity: {
                        orderBy: { date: 'desc' },
                        take: 6,
                        select: {
                          date: true,
                          dailyActivity: {
                            select: {
                              date: true,
                              totalSubmissions: true,
                              acceptedSubmissions: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              friendsReceived: {
                where: {
                  status: 'Accepted'
                },
                select: {
                  requester: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      points: true,
                      currentStreak: true,
                      maxStreak: true,
                      totalSubmissions: true,
                      acceptedSubmissions: true,
                      dailyActivity: {
                        orderBy: { date: 'desc' },
                        take: 7,
                        select: {
                          date: true,
                          totalSubmissions: true,
                          acceptedSubmissions: true,
                        },
                      },
                      monthlyActivity: {
                        orderBy: { date: 'desc' },
                        take: 6,
                        select: {
                          date: true,
                          dailyActivity: {
                            select: {
                              date: true,
                              totalSubmissions: true,
                              acceptedSubmissions: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          });
        return NextResponse.json(userData)
    } catch (error) {
        return NextResponse.json({error: error})
    }
}