import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 1100, // Increase warning limit to 1.1MB for TursoDB dependencies
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create vendor chunk for React
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }
          // Create TanStack chunk
          if (id.includes('@tanstack/')) {
            return 'tanstack';
          }
          // Create auth chunk
          if (id.includes('better-auth') || id.includes('axios')) {
            return 'auth';
          }
          // Create UI chunk for smaller utilities
          if (id.includes('@radix-ui/') || 
              id.includes('lucide-react') || 
              id.includes('clsx') || 
              id.includes('class-variance-authority') || 
              id.includes('tailwind-merge')) {
            return 'ui';
          }
          // Create router chunk
          if (id.includes('react-router')) {
            return 'router';
          }
        }
      }
    }
  },
  ssr: {
    // Exclude server-only modules from SSR bundle externalization
    noExternal: ['@tanstack/react-query', '@tanstack/react-table']
  }
});
