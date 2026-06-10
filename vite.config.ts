// Configuração padrão fornecida pelo template Lovable (TanStack Start + Vite).
// O wrapper @lovable.dev/vite-tanstack-config já inclui:
//   - @vitejs/plugin-react / tanstackStart / tailwindcss / tsconfigPaths
//   - nitro (preset cloudflare por padrão, compatível com Vercel/Netlify/Node via env NITRO_PRESET no host)
//   - alias "@" -> ./src, injeção de VITE_*, componentTagger em dev
//
// Mantemos a config mínima para evitar o erro "could not find a valid plugins array".
// Para builds em outros hosts, defina NITRO_PRESET no ambiente do provedor
// (ex.: Vercel/Netlify detectam automaticamente; Node use NITRO_PRESET=node-server).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
