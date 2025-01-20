import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Vite's default configuration should work out of the box
  // for basic setups, no need to specify entry unless you need advanced options.
   plugins: [react()],
});
