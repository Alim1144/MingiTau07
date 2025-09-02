import { PrismaClient } from "@prisma/client";

// Ensure DATABASE_URL is set at runtime (Netlify) for SQLite file path
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;


