// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';


import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PEXELS_API_KEY': JSON.stringify(import.meta.env.PEXELS_API_KEY)
    }
  }
});