import { readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Адрес сайта берётся из content.json, чтобы его правка не требовала лезть в код.
//
// replace убирает метку порядка байтов (BOM) — невидимый символ, который
// Блокнот и PowerShell добавляют в начало файла при сохранении. JSON.parse
// на нём падает, а причина по виду файла не определяется никак.
const сырой = readFileSync(new URL('./src/content.json', import.meta.url), 'utf-8')
const content = JSON.parse(сырой.replace(/^﻿/, ''))

export default defineConfig({
  site: content.сайт.адрес,
  // Пробные страницы оформления в карту сайта не попадают: поисковик принял
  // бы их за копии главной.
  integrations: [sitemap({ filter: (page) => !page.includes('/proba') && !page.includes('/rilsy') && !page.includes('/vk/') })],
  // Старые пробы оформления (октябрь 2026) больше не нужны, ссылки на них
  // уже пересылали — ведём на главную. /proba/ снова занята текущей пробой.
  redirects: {
    '/proba/neon': '/',
    '/proba/temnyi': '/',
    '/proba/svetlyi': '/',
  },
})
