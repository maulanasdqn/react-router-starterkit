# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 application with server-side rendering, built with TypeScript and styled with TailwindCSS. The project follows the modern React Router file-based routing system and includes a complete development and production build pipeline.

## Development Commands

### Core Commands
- `bun run dev` - Start development server with HMR at http://localhost:5173
- `bun run build` - Create production build
- `bun run start` - Start production server from built files
- `bun run typecheck` - Run TypeScript type checking and generate route types

### Code Quality & Formatting
- `bun run lint` - Run Biome linting (25x faster than ESLint)
- `bun run lint:fix` - Auto-fix linting issues with Biome
- `bun run lint:css` - Run Stylelint on CSS files
- `bun run lint:css:fix` - Auto-fix CSS linting issues
- `bun run format` - Format all files with Biome
- `bun run check` - Run all checks (typecheck + lint + css lint)

### UI Components
- `bun run ui:add <component>` - Add shadcn/ui components (e.g., `bun run ui:add button`)

### Storybook
- `bun run storybook` - Start Storybook development server at http://localhost:6006
- `bun run storybook:build` - Build Storybook for production deployment

### Package Manager
This project uses **Bun** as the primary package manager and runtime. All commands should use `bun` instead of `npm`.

## Architecture

### Project Structure
```
app/
├── root.tsx           # Root layout with HTML structure, error boundary
├── routes.ts          # Route configuration (file-based routing)
├── routes/            # Route components
│   └── home.tsx       # Index route
├── welcome/           # Feature components
└── app.css           # Global styles

build/                 # Production build output
├── client/           # Static assets
└── server/           # Server-side code
```

### Key Architectural Patterns

**Route Definition**: Routes are defined in `app/routes.ts` using React Router's configuration API, not file-based auto-discovery.

**Type Safety**: Strong TypeScript integration with auto-generated route types via `react-router typegen`.

**Server-Side Rendering**: Configured for SSR by default (`ssr: true` in `react-router.config.ts`), can be disabled for SPA mode.

**Path Aliases**: Uses `@/*` alias for `./app/*` imports (configured in tsconfig.json).

### Route Structure
- Routes use typed `Route.MetaArgs`, `Route.LinksFunction`, etc. from generated types
- Each route can export `meta`, `links`, `loader`, `action` functions
- Route types are auto-generated in `.react-router/types/`

### Styling & Design System
- **TailwindCSS v4+** with Vite plugin integration
- **Rose Pine Color Scheme** - Sophisticated, minimalist theme with three variants:
  - Base (default): Dark theme with purple/pink accents
  - Moon: Darker variant for true dark mode
  - Dawn: Light variant for daytime use
- **shadcn/ui** - Production-ready component library with Rose Pine integration
- Global styles in `app/app.css` with CSS custom properties
- Components in `app/components/ui/` with proper TypeScript types

### Development Tools
- **Biome** - Ultra-fast linting and formatting (25x faster than Prettier, 15x faster than ESLint)
- **Stylelint** - CSS/SCSS linting optimized for TailwindCSS
- **Husky** - Git hooks for automated quality checks
- **lint-staged** - Run linters only on staged files for faster commits
- **EditorConfig** - Consistent editor settings across team members
- **Storybook v9.1** - Component documentation and development environment with Rose Pine theming

### TanStack Ecosystem
- **TanStack React Query** - Powerful data synchronization with automatic caching, background updates, and optimistic updates
- **TanStack React Table** - Headless table logic with sorting, filtering, pagination, row selection, and virtualization
- **TanStack Store** - Type-safe, framework-agnostic state management with reactive updates and minimal boilerplate
- **React Query DevTools** - Development tools for debugging queries (dev mode only)

### Configuration Files
- `vite.config.ts` - Vite build configuration with React Router, TailwindCSS, and TypeScript paths
- `react-router.config.ts` - React Router specific configuration
- `tsconfig.json` - TypeScript configuration with strict mode and React JSX
- `biome.json` - Biome linting and formatting configuration
- `stylelint.config.js` - Stylelint configuration optimized for TailwindCSS
- `components.json` - shadcn/ui configuration for component generation
- `.editorconfig` - Editor consistency settings
- `.lintstagedrc.json` - lint-staged configuration for pre-commit hooks

## Docker Deployment

Multi-stage Dockerfile included for production deployment:
1. Development dependencies stage
2. Production dependencies stage  
3. Build stage
4. Final runtime stage

The app runs on port 3000 in production containers.

## Important Notes

### Adding New Routes
1. Create route component in `app/routes/`
2. Import and configure in `app/routes.ts`
3. Run `bun run typecheck` to generate new route types

### Adding UI Components
1. Use `bun run ui:add <component-name>` to add shadcn/ui components
2. Components are added to `app/components/ui/` with Rose Pine theming
3. Import and use: `import { Button } from "@/components/ui/button"`

### TanStack Usage Patterns

**React Query Data Fetching:**
```typescript
import { useUsers, useCreateUser } from "@/lib/api";

// In component
const { data: users, isLoading, error } = useUsers();
const createUser = useCreateUser();
```

**React Table Implementation:**
```typescript
import { useConfiguredTable } from "@/lib/table-utils";

// In component
const { table } = useConfiguredTable({
  data: users,
  columns: columnDefinitions,
});
```

**TanStack Store State Management:**
```typescript
import { useUserAuth, useNotificationManager } from "@/lib/store-hooks";

// In component
const { user, setUser, logout } = useUserAuth();
const { success, error } = useNotificationManager();
```

### Git Workflow & Quality Gates
- **Pre-commit**: Automatically runs lint-staged (Biome + Stylelint on staged files)
- **Pre-push**: Runs TypeScript type checking to prevent breaking changes
- All formatting and basic linting issues are auto-fixed before commit
- Use `bun run check` to manually run all quality checks

### TypeScript Integration
- Always run `bun run typecheck` after route changes
- Route types are auto-generated - don't manually edit `.react-router/types/`
- Use typed route functions: `Route.MetaArgs`, `Route.LoaderArgs`, etc.

### Error Handling
- Global error boundary in `root.tsx` with development stack traces
- 404 handling included in error boundary

### Performance
- Server-side rendering enabled by default
- Static asset optimization through Vite
- Production builds optimized for deployment

## Storybook Setup

### Overview
Storybook v9.1 is configured with Rose Pine theming and full integration with the project's tech stack.

### Key Features
- **Rose Pine Theme Integration** - Three theme variants (Base, Moon, Dawn) with toolbar switcher
- **React Router v7 Compatibility** - Custom script handles Vite config conflicts automatically
- **TanStack Integration** - Stories showcase React Query, React Table, and Store functionality
- **Accessibility Testing** - Built-in a11y addon for component accessibility validation
- **Auto Documentation** - TypeScript prop extraction and automatic docs generation

### Usage Patterns

**Creating Component Stories:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '@/components/YourComponent';

const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

**TanStack Stories with Providers:**
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ /* config */ });

const Wrapper = () => (
  <QueryClientProvider client={queryClient}>
    <YourComponent />
  </QueryClientProvider>
);
```

### Technical Details
- **Conflict Resolution**: Custom script temporarily moves `vite.config.ts` during Storybook execution
- **Path Aliases**: `@/*` paths work in stories via `vite-tsconfig-paths`
- **CSS Integration**: TailwindCSS v4 and PostCSS fully functional in stories
- **Theme Switching**: Global theme decorator applies Rose Pine variants

### Story Organization
- `stories/` - Main story files and documentation
- Component stories use TanStack providers when needed
- MDX documentation files for setup guides and architectural notes