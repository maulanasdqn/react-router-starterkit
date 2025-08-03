import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../app'),
    },
  },
  // Debug: Log the resolved path
  configResolved(config) {
    console.log('Storybook Vite config resolved. Alias:', config.resolve?.alias);
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  css: {
    postcss: resolve(__dirname, '../postcss.config.js'),
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});