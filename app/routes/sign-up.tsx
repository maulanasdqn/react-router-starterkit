import { SignUpForm } from "@/components/auth";
import { getOptionalAuth, redirectIfAuthenticated } from "@/utils/auth";
import type { Route } from "./+types/sign-up";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getOptionalAuth(request);
  redirectIfAuthenticated(session);
  return null;
}

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SignUpForm />
    </div>
  );
}