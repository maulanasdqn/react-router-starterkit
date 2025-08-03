import { UserNav } from "@/components/auth";
import { requireAuth } from "@/utils/auth";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth(request);
  return { user };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">
            Dashboard
          </h1>
          <UserNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back, {user.name || user.email}!
            </h2>
            <p className="text-muted-foreground">
              This is your protected dashboard. Only authenticated users can access this page.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Profile Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span> {user.name || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Account Status
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Email Verified:</span>{" "}
                  <span className={user.emailVerified ? "text-green-600" : "text-orange-600"}>
                    {user.emailVerified ? "Yes" : "Pending"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Account Created:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Quick Actions
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Explore the authenticated features of your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}