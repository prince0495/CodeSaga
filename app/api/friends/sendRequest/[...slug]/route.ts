import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const body = await req.json();
    try {
        // recipientId
        /*
        model Friendship {
  id                      String              @id @default(uuid())
  requesterId             String
  recipientId             String
  requester               User                @relation("Friend_Initiated", fields: [requesterId], references: [id], onDelete: Cascade)
  recipient               User                @relation("Friend_Received", fields: [recipientId], references: [id], onDelete: Cascade)
  status                  String              @default("Pending")
  createdAt               DateTime            @default(now())
  acceptedAt              DateTime             @default(now())
  @@unique([requesterId, recipientId])
}
        */
       const prisma = globalPrismaClient;
       const alreadyExist = await prisma.friendship.findFirst({
        where: {
            OR: [
                {requesterId: slug[0], recipientId: body.recipientId},
                {requesterId: body.recipientId, recipientId: slug[0]}
            ]
        },
        select: {
            status: true
        }
       })
       if(alreadyExist) {
           return NextResponse.json({message: "Already exist", status: alreadyExist.status})
       }

       const friendship = await prisma.friendship.create({
        data: {
            requesterId: slug[0],
            recipientId: body.recipientId
        }
       })
       /*
        id                      String              @id @default(uuid())
  userId                  String
  user                    User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt               DateTime            @default(now())
  message      
       */
       await prisma.notification.create({
        data: {
            userId: body.recipientId,
            message: `${body.requesterName} sent you a friend request`
        }
       })
       return NextResponse.json(friendship)
        
    } catch (error) {
        return NextResponse.json({message:"Error", error});
    }
}