import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/auth";
import { getOptionalAuth } from "@/utils/auth";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "React Router + better-auth" },
    { name: "description", content: "A modern authentication setup with React Router and better-auth" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getOptionalAuth(request);
  return { session };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { session } = loaderData;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">
            React Router + better-auth
          </h1>
          {session ? (
            <UserNav />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Authentication Made Simple
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              A modern React Router v7 application with better-auth integration,
              featuring email/password authentication and GitHub OAuth.
            </p>
          </div>

          {session ? (
            <div className="space-y-4">
              <p className="text-lg">
                Welcome back, <span className="font-semibold">{session.user.name || session.user.email}</span>!
              </p>
              <Button size="lg" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link to="/sign-up">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          )}

          <div className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">🔐 Secure Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Email/password and OAuth authentication with better-auth
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">⚡ Modern Stack</h3>
              <p className="text-sm text-muted-foreground">
                React Router v7, TypeScript, TailwindCSS, and shadcn/ui
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">🛡️ Type Safety</h3>
              <p className="text-sm text-muted-foreground">
                Full TypeScript support with auto-generated route types
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
