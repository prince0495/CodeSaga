import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:any) {
    const param = await params;
    const currentPage = parseInt(param.slug[0]);
    const problemsPerPage = parseInt(param.slug[1]);
    const prisma = globalPrismaClient;
    try {
          const skipProblems = (currentPage-1)*(problemsPerPage);
          const problems = await prisma.problem.findMany(
              {
                  skip: skipProblems,
                  take: problemsPerPage,
                  select: {
                      problemURL: true,
                      acceptedSubmissions: true,
                      totalSubmissions: true                
                  }
              }
          )
          return NextResponse.json({problems})
    } catch (error) {
        return NextResponse.json({'message': error})
    }
}