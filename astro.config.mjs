import { readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Адрес сайта берётся из content.json, чтобы его правка не требовала лезть в код.
//
// replace убирает метку порядка байтов (BOM) — невидимый символ, который
// Блокнот и PowerShell добавляют в начало файла при сохранении. JSON.parse
// на нём падает, а причина по виду файла не определяется никак.
const сырой = readFileSync(new URL('./src/content.json', import.meta.url), 'utf-8')
const content = JSON.parse(сырой.replace(/^﻿/, ''))

export default defineConfig({
  site: content.сайт.адрес,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
