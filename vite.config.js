import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    resolve: {
        alias: {
            'src': '/src'
        }
    },
    build: {
        rollupOptions: {
            external: [
                // Add external dependencies here if needed
            ]
        }
    }
})