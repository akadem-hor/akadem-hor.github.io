import { readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Адрес сайта берётся из content.json, чтобы его правка не требовала лезть в код.
const content = JSON.parse(
  readFileSync(new URL('./src/content.json', import.meta.url), 'utf-8')
)

export default defineConfig({
  site: content.сайт.адрес,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
