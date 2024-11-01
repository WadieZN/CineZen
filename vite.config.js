import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression'; 
import { createHtmlPlugin } from 'vite-plugin-html'; 
import obfuscator from 'rollup-plugin-obfuscator'; 

export default defineConfig({
  plugins: [
    react(),
    viteCompression(), 
    createHtmlPlugin({ 
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    obfuscator({ 
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
    }),
  ],
  build: {
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true, 
      },
      mangle: {
        properties: {
          regex: /^_/, 
        },
      },
    },
  },
});
