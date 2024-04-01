import { lucia } from "@hirer/auth";
import prisma from "@hirer/database";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { isWithinExpirationDate } from "oslo";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const verificationToken = searchParams.get("token");
  const email = searchParams.get("email");

  const token = await prisma.verificationCode.findFirst({
    where: {
      code: verificationToken as string,
      email: email as string,
    },
  });

  if (token) {
    await prisma.verificationCode.delete({
      where: {
        id: token.id,
      },
    });
  }

  if (
    !token ||
    !isWithinExpirationDate(token.expiresAt) ||
    email !== token.email
  ) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login/expired-request",
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: token.userId,
    },
  });

  if (!user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login/expired-request",
      },
    });
  }

  await lucia.invalidateUserSessions(user.id);

  if (user.emailVerified === false) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
