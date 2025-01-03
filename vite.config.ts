import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pluginChecker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  // base: './demo-vegetable-shop',
  plugins: [pluginChecker({ typescript: true }), react()],
})
