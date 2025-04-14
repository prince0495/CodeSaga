import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: {slug: string[]}}) {
  const param = await params;
  const prisma = globalPrismaClient;
  try {
    const testcases = await prisma.example.findMany({
      where: {
        problemId: param.slug[0]
      }
    })
    return NextResponse.json(testcases)
  } catch (error) {
    return NextResponse.json({message: 'Invalid problem id'})
  }
}