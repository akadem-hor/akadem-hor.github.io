import content from '../content.json'

// robots.txt собирается из content.json, чтобы адрес сайта был записан
// в одном месте, а не продублирован ещё и здесь.
export const GET = () => {
  const адрес = content.сайт.адрес.replace(/\/$/, '')

  const текст = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${адрес}/sitemap-index.xml`,
    '',
  ].join('\n')

  return new Response(текст, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
