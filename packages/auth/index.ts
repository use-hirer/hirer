import prisma from "@hirer/database";
import { UserDataType } from "@hirer/database/types";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? ".hirer.so" : "",
      sameSite: "lax",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      name: attributes.name,
      image: attributes.image,
      onboarded: attributes.onboarded,
      data: attributes.data,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
  onboarded: boolean;
  data: UserDataType;
}

export default lucia;
