/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'todo_app',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoList': './src/components/TodoList.tsx',
        './TodoFilter': './src/components/TodoFilter.tsx',
        './TodoCreation': './src/components/TodoList.tsx'
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "/src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts"
  },
});
