import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../Prisma/generated/client';

console.log(`[PrismaClient] Initializing adapter. Host: ${process.env.DATABASE_HOST}`);

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 30
});
const prisma = new PrismaClient({ adapter });

export * from '../Prisma/generated/client';
export { prisma };