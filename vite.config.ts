// vite.config.ts
import {defineConfig} from 'vite'
import {resolve} from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
    plugins: [
        Vue(),
        UnoCSS({
            configFile: './uno.config.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
})
