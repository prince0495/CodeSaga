import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        try {
        const userId = slug[0];
        const prisma = globalPrismaClient;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                acceptedEasy: true,
                acceptedMedium: true,
                acceptedHard: true,
                totalEasy: true,
                totalMedium: true,
                totalHard: true,
                totalSubmissions: true,
                acceptedSubmissions: true,
                duplicateAcceptedEasy: true,
                duplicateAcceptedMedium: true,
                duplicateAcceptedHard: true,
                duplicateTotalEasy: true,
                duplicateTotalMedium: true,
                duplicateTotalHard: true,
                duplicateTotalSubmissions: true,
                duplicateAcceptedSubmissions : true,
                points: true,
                currentStreak: true,
                maxStreak: true,
                activeDays: true,
                image: true,
                bio: true,
                location: true,
                skills: true,
                socialHandles: true,
                personalProjects: true,
                portfolioLink: true,
                Role: true,
                education: true,
                createdAt: true
            }
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error)
        
    }
}