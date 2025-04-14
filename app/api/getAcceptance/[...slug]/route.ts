import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
        const currentPage = parseInt(slug[0]);
    const problemsPerPage = parseInt(slug[1]);
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
        return NextResponse.json({message: error})
    }
}