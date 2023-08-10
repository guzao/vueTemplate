/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
    test: {
        // 模拟dom环境
        environment: "happy-dom",
        alias: {
            "@": resolve(__dirname, 'src'),
        }
    },
    
})