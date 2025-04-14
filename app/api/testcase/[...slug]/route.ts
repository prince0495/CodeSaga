import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  if (!slug || slug.length === 0) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }
    const prisma = globalPrismaClient;
  try {
    const testcases = await prisma.example.findMany({
      where: {
        problemId: slug[0]
      }
    })
    return NextResponse.json(testcases)
  } catch (error) {
    return NextResponse.json({message: 'Invalid problem id', error: error})
  }
}