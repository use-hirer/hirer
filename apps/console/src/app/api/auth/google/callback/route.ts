import { google, lucia } from "@console/lib/auth";
import prisma from "@console/lib/prisma";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    cookies().get("google_oauth_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser: GoogleUser = await response.json();

    if (googleUser.email_verified === false) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login/unverified-email",
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
      include: {
        accounts: {
          where: {
            provider: {
              equals: "google",
            },
          },
        },
      },
    });

    if (user) {
      if (user.accounts.length === 0) {
        await prisma.account.create({
          data: {
            provider: "google",
            providerAccountId: googleUser.sub,
            userId: user.id,
          },
        });

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            image: googleUser.picture,
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
    } else {
      const user = await prisma.user.create({
        data: {
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.picture,
          emailVerified: true,
        },
      });

      await prisma.account.create({
        data: {
          provider: "google",
          providerAccountId: googleUser.sub,
          userId: user.id,
        },
      });

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
