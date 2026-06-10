// @lovable.dev/vite-tanstack-config já inclui tanstackStart, viteReact, tailwindcss,
// tsConfigPaths, nitro (com cloudflare como preset padrão), componentTagger (dev),
// injeção de env VITE_*, alias @, dedupe React/TanStack e plugins de logging.
//
// Para permitir deploy livre em diferentes ambientes (Node, Vercel, Netlify, Bun,
// Deno, Cloudflare, etc.), o preset do Nitro é configurável via variável de
// ambiente `NITRO_PRESET` (ou `BUILD_PRESET`). Exemplos:
//
//   NITRO_PRESET=node-server   bun run build   # Node.js (VPS, Docker, Railway...)
//   NITRO_PRESET=bun           bun run build   # Bun runtime
//   NITRO_PRESET=vercel        bun run build   # Vercel
//   NITRO_PRESET=netlify       bun run build   # Netlify
//   NITRO_PRESET=deno-server   bun run build   # Deno
//   NITRO_PRESET=cloudflare-module bun run build  # Cloudflare Workers (padrão)
//
// Sem a variável definida, mantém o preset padrão (Cloudflare) usado no preview Lovable.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const preset = process.env.NITRO_PRESET ?? process.env.BUILD_PRESET;

export default defineConfig({
  tanstackStart: {
    // Redireciona o entrypoint SSR do TanStack Start para src/server.ts
    // (nosso wrapper de erro SSR). nitro/vite usa isto no build.
    server: { entry: "server" },
  },
  ...(preset
    ? {
        nitro: {
          preset,
        },
      }
    : {}),
});
