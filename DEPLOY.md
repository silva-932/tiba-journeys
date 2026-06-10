# Deploy — TIBA Viagens & Turismo

Este projeto usa **TanStack Start + Vite + Nitro**, o que permite gerar builds
para praticamente qualquer plataforma de hospedagem sem alterar o código da
aplicação. Basta escolher o **preset** do Nitro no momento do build.

## Build local

```bash
bun install
bun run build       # build padrão (Cloudflare — usado no preview Lovable)
```

## Build para outros ambientes

Defina a variável de ambiente `NITRO_PRESET` antes do build:

| Plataforma                | Comando                                          |
| ------------------------- | ------------------------------------------------ |
| Node.js (VPS, Docker)     | `NITRO_PRESET=node-server bun run build`         |
| Bun (servidor)            | `NITRO_PRESET=bun bun run build`                 |
| Vercel                    | `NITRO_PRESET=vercel bun run build`              |
| Netlify                   | `NITRO_PRESET=netlify bun run build`             |
| Deno                      | `NITRO_PRESET=deno-server bun run build`         |
| Cloudflare Workers        | `NITRO_PRESET=cloudflare-module bun run build`   |
| AWS Lambda                | `NITRO_PRESET=aws-lambda bun run build`          |
| Site estático (SSG)       | `NITRO_PRESET=static bun run build`              |

Saída em `.output/` (estrutura definida pelo preset escolhido).

### Exemplo — Node.js / Docker / VPS

```bash
NITRO_PRESET=node-server bun run build
node .output/server/index.mjs
```

### Exemplo — Vercel

1. Conectar o repositório no painel da Vercel.
2. Em **Environment Variables**, adicionar `NITRO_PRESET = vercel`.
3. Build command: `bun run build` · Output: detectado automaticamente.

### Exemplo — Netlify

1. Conectar o repositório no Netlify.
2. Adicionar variável `NITRO_PRESET = netlify`.
3. Build command: `bun run build`.

### Exemplo — Cloudflare Pages / Workers

```bash
NITRO_PRESET=cloudflare-module bun run build
# faça deploy de .output/ com wrangler
```

## Variáveis de ambiente

- **Públicas** (expostas ao browser): prefixo `VITE_` — ex.: `VITE_API_URL`.
- **Privadas** (apenas servidor): sem prefixo — lidas via `process.env.X` dentro
  de handlers de server functions.

Lista completa de presets do Nitro: <https://nitro.build/deploy>.
