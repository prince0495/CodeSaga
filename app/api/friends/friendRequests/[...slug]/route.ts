import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
/*
model Friendship {
  id                      String              @id @default(uuid())
  requesterId             String
  recipientId             String
  requester               User                @relation("Friend_Initiated", fields: [requesterId], references: [id], onDelete: Cascade)
  recipient               User                @relation("Friend_Received", fields: [recipientId], references: [id], onDelete: Cascade)
  status                  String              @default("Pending")
  createdAt               DateTime            @default(now())
  acceptedAt              DateTime
  @@unique([requesterId, recipientId])
}

*/
export async function GET(req: NextRequest, {params}: any) {
    const param = await params;
    const userId = param.slug[0]
    try {
        const prisma = globalPrismaClient;
        const friendships = await prisma.friendship.findMany({
            where: {
                recipientId: userId,
                status: 'Pending'
            },
            select: {
                requester: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        return NextResponse.json(friendships)
    } catch (error) {
        return NextResponse.json({message: error})
    }
}