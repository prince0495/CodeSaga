import { ProfileData } from "@/components/UserInfoPage";
import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const body = await req.json()
    const profile: ProfileData = body.profile;
    console.log(body);
    try {
        const prisma = globalPrismaClient;
        const user = await prisma.user.update({
            where: {
                id: slug[0]
            },
            data: {
                name: profile.name,
                location: profile.location,
                education: profile.education,
                bio: profile.bio,
                socialHandles: profile.socialLinks
            }
        })
        console.log(user);
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error)
    }
}