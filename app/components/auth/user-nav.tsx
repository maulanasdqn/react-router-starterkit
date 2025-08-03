import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/libs/better-auth";

export function UserNav() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">
            {session.user.name?.charAt(0) || session.user.email.charAt(0)}
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium">
            {session.user.name || session.user.email}
          </p>
          <p className="text-xs text-muted-foreground">
            {session.user.email}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}