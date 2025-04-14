import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: {params: {slug: string[]}}) {
    const param = await params;
    const body = await req.json();
    try {
        const prisma = globalPrismaClient;
        const recipientId: string = param.slug[0];
        const requesterId: string = body.requesterId;
        if(recipientId === requesterId) {
            return NextResponse.json({message: 'You cannot friend yourself'})
        }
        // he already sent you friend request then delete that request and accept current request
        // otherwise check that if the request that i am going to accept is exist or not, if not exist then do not accpet that request
        const oppositeRequest = await prisma.friendship.findUnique({
            where: {
                requesterId_recipientId: {
                    requesterId: recipientId,
                    recipientId: requesterId
                }
            },
            select: {
                status: true
            }
        })
        if(oppositeRequest) {
            if(oppositeRequest.status === 'Pending') {
                await prisma.friendship.delete({
                    where: {
                        requesterId_recipientId: {
                            requesterId: recipientId,
                            recipientId: requesterId
                        }
                    }
                })
                const friendship = await prisma.friendship.upsert({
                    where: {
                        requesterId_recipientId: {
                            requesterId: requesterId,
                            recipientId: recipientId
                        }
                    },
                    update: {
                        status: 'Accepted'
                    },
                    create: {
                        requesterId: requesterId,
                        recipientId: recipientId,
                        status: 'Accepted'
                    },
                    select: {
                        requester: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                })
                await prisma.notification.create({
                    data: {
                        userId: requesterId,
                        message: `${body.accepterName} accepted your friend request`
                    }
                })
                return NextResponse.json(friendship)
            }
            else {
                return NextResponse.json({message: 'Friendship already exists'})
            }
        }
        else {
            const alreadyExist = await prisma.friendship.findUnique({
                where: {
                    requesterId_recipientId: {
                        requesterId: requesterId,
                        recipientId: recipientId
                    }
                },
                select: {
                    status: true
                }
            })
            if(alreadyExist) {
                if(alreadyExist.status === 'Pending') {
                    const friendship = await prisma.friendship.update({
                        where: {
                            requesterId_recipientId: {
                                requesterId: requesterId,
                                recipientId: recipientId
                            }
                        },
                        data: {
                            status: 'Accepted'
                        },
                        select: {
                            requester: {
                                select: {
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    })
                    await prisma.notification.create({
                        data: {
                            userId: requesterId,
                            message: `${body.accepterName} accepted your friend request`
                        }
                    })
                    return NextResponse.json(friendship)
                }
                else {
                    return NextResponse.json({message: 'Friendship already exists'})
                }
            }
            return NextResponse.json({message: 'You cannot accept request that has never been initialized'})
        }
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}