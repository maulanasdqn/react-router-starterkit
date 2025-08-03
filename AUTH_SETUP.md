# Better-Auth Integration Setup

This document explains the better-auth integration that has been added to this React Router v7 project.

## Overview

Better-auth has been integrated following the project's established architecture patterns and conventions:

- **Library Configuration**: Located in `app/libs/better-auth/`
- **Authentication Components**: Located in `app/components/auth/`
- **Utility Functions**: Located in `app/utils/auth.ts`
- **Styling**: Uses existing shadcn/ui components and TailwindCSS

## File Structure

```
app/
├── libs/
│   └── better-auth/
│       ├── auth-server.ts      # Server-side auth configuration
│       ├── auth-client.ts      # Client-side auth hooks
│       └── index.ts            # Barrel exports
├── components/
│   └── auth/
│       ├── sign-in-form.tsx    # Sign-in form component
│       ├── sign-up-form.tsx    # Sign-up form component
│       ├── user-nav.tsx        # User navigation component
│       └── index.ts            # Barrel exports
├── routes/
│   ├── api.auth.$.ts           # Auth API handler route
│   ├── sign-in.tsx             # Sign-in page
│   ├── sign-up.tsx             # Sign-up page
│   ├── dashboard.tsx           # Protected dashboard
│   └── home.tsx                # Updated home page
└── utils/
    └── auth.ts                 # Auth utility functions
```

## Features Implemented

### Authentication Methods
- ✅ Email/Password authentication
- ✅ GitHub OAuth (configurable)
- ✅ Session management
- ✅ Automatic redirects

### Components
- ✅ Sign-in form with email/password and GitHub
- ✅ Sign-up form with validation
- ✅ User navigation component
- ✅ Protected route examples

### Route Protection
- ✅ `requireAuth()` - Redirects to sign-in if not authenticated
- ✅ `getOptionalAuth()` - Returns session or null
- ✅ `redirectIfAuthenticated()` - Redirects authenticated users

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# GitHub OAuth (optional)
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret_here

# API Base URL
VITE_API_URL=http://localhost:5173
```

### GitHub OAuth Setup (Optional)

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:5173/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env` file

## Usage Examples

### Protected Route

```typescript
// app/routes/protected.tsx
import { requireAuth } from "@/utils/auth";
import type { Route } from "./+types/protected";

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth(request);
  return { user };
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return <div>Hello {user.name || user.email}!</div>;
}
```

### Optional Authentication

```typescript
// app/routes/public.tsx
import { getOptionalAuth } from "@/utils/auth";
import type { Route } from "./+types/public";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getOptionalAuth(request);
  return { session };
}

export default function Public({ loaderData }: Route.ComponentProps) {
  const { session } = loaderData;
  return (
    <div>
      {session ? `Welcome ${session.user.email}!` : "Welcome guest!"}
    </div>
  );
}
```

### Client-Side Hooks

```typescript
import { useSession, signIn, signOut } from "@/libs/better-auth";

function MyComponent() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <div>Loading...</div>;
  
  return session ? (
    <button onClick={() => signOut()}>Sign Out</button>
  ) : (
    <button onClick={() => signIn.email({ email, password })}>
      Sign In
    </button>
  );
}
```

## Database

The integration uses TursoDB (LibSQL) with Drizzle ORM:
- **Database**: TursoDB - Edge-ready SQLite database  
- **ORM**: Drizzle ORM with LibSQL driver
- **Schema**: Located in `app/libs/database/schema.ts`
- **Client**: Located in `app/libs/database/client.ts`
- **Migrations**: Managed via `drizzle.config.ts`

### Database Setup

1. Create a TursoDB account at https://turso.tech
2. Create a new database
3. Get your database URL and auth token
4. Add to your `.env` file:

```bash
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token_here
```

### Database Schema

The schema includes Better Auth required tables:
- `user` - User accounts and profiles
- `session` - User sessions and tokens  
- `account` - OAuth provider accounts
- `verification` - Email verification tokens

### Local Development

For local development, the client falls back to a local SQLite file:
```bash
# If no TURSO_DATABASE_URL is set, uses:
file:local.db
```

## Development

Start the development server:

```bash
bun run dev
```

The authentication endpoints will be available at:
- `/api/auth/*` - All better-auth endpoints
- `/sign-in` - Sign-in page
- `/sign-up` - Sign-up page
- `/dashboard` - Protected dashboard example

## Styling

All components follow the project's design system:
- Uses shadcn/ui Button component
- Follows TailwindCSS Rose Pine color scheme
- Multi-line class formatting per project conventions
- Consistent spacing and typography

## Type Safety

Full TypeScript support:
- Typed authentication utilities
- Proper session and user types
- React Router v7 type integration
- Auto-generated route types

The integration is complete and ready for development!