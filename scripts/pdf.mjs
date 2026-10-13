// renders the built site to an A4 pdf in its dark design: npm run pdf
import { preview } from 'vite'
import puppeteer from 'puppeteer-core'

const out = process.argv[2] ?? 'felix-niemeyer-portfolio.pdf'
// layout width in css px = A4 width / scale, so the desktop grid is used
const scale = 0.62

const server = await preview({ preview: { port: 4174 } })
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? '/usr/bin/chromium' })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: Math.round(794 / scale), height: 1200 })
  await page.goto('http://localhost:4174/', { waitUntil: 'networkidle0' })
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager'
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
    await document.fonts.ready
  })
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true, scale })
  console.log(`wrote ${out}`)
} finally {
  await browser.close()
  server.httpServer.close()
}
