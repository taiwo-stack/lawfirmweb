import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH=/lawfirmweb/ when previewing on <user>.github.io/lawfirmweb; "/" once the custom domain is live.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [{ path: '/404' }],
      sitemap: { enabled: true, host: 'https://zestpartnersng.com' },
    }),
    viteReact(),
  ],
})
