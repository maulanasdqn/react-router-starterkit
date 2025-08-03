import { redirect } from "react-router";
import { auth } from "@/libs/better-auth";
import type { Session, User } from "@/entities/auth/types";

type AuthSession = {
  session: Session;
  user: User;
};

export async function requireAuth(request: Request): Promise<AuthSession> {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw redirect("/sign-in");
  }

  return session;
}

export async function getOptionalAuth(
  request: Request,
): Promise<AuthSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return session;
  } catch {
    return null;
  }
}

export function redirectIfAuthenticated(
  session: AuthSession | null,
  to: string = "/",
) {
  if (session) {
    throw redirect(to);
  }
}

