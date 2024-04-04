import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { ActivityDataType, UserDataType } from "./types";

declare global {
  var prisma: PrismaClient | undefined;

  namespace PrismaJson {
    type ActivityData = ActivityDataType;
    type UserData = UserDataType;
  }
}

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
// @ts-ignore
const prisma = global.prisma || new PrismaClient({ adapter: adapter });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
