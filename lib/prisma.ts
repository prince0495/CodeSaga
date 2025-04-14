// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { globalPrismaClient: PrismaClient };

export const globalPrismaClient =
  globalForPrisma.globalPrismaClient || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.globalPrismaClient = globalPrismaClient;  