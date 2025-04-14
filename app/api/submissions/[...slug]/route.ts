import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:any) {
    const param = await params;
    const userId = param.slug[0];
    const language = param.slug[1];
    const problemURL = param.slug[2];
    const prisma = globalPrismaClient;
    try {
        /*
        id                   String       @unique @default(uuid())
  submittedAt          DateTime     @default(now())
  status               String       @default("pending")
  userId               String
  user                 User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  problemURL            String
  problem              Problem      @relation(fields: [problemURL], references: [problemURL], onDelete: Cascade)
  code                 String
  language             String
  today    
  {status: string, language: string, code: string, socketId: string,  problemTitle: string, runnerType: string, submissionTime: Date, userId: string, problemURL: string, difficulty: string, topics: string[] | undefined}
        */
        const submissions = await prisma.submission.findMany({
            where: {
                userId: userId,
                language: language,
                problemURL: problemURL,
            },
            select: {
                code: true,
                status: true,
                submittedAt: true,
                language: true
            }
        })
        console.log(submissions);
        return NextResponse.json(submissions)
    } catch (error) {
        return NextResponse.json({'message': 'Error fetching submissions'}, {status: 500 })
    }
}