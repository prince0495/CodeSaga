import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const prisma = globalPrismaClient;
        const feedback = await prisma.feedback.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phoneNumber: body.phone,
                message: body.message,
                services: body.services
            }
        })
        return NextResponse.json({message: 'Feedback submitted successfully'})
    } catch (error) {
        return NextResponse.json({error: error})
        
    }
}