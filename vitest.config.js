/// <reference types="vitest" />
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'


export default defineConfig({
    plugins: [ vue() ],
    test: {
        // 模拟dom环境
        environment: "happy-dom",
        include: ['./src/tests/**'],
        alias: {
            "@": resolve(__dirname, 'src'),
        }
    },
})