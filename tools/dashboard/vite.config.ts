import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const projectRoot = path.resolve(__dirname, '..', '..')

function serveStrategyFile(urlPath: string, filePath: string) {
  return {
    name: `serve-strategy-${urlPath.replace(/\W/g, '-')}`,
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(urlPath, (_req, res) => {
        try {
          const content = fs.readFileSync(filePath, 'utf-8')
          res.setHeader('Content-Type', 'text/markdown')
          res.end(content)
        } catch {
          res.statusCode = 404
          res.end('Not found')
        }
      })
    },
  }
}

function writeStrategyFile(urlPath: string, filePath: string) {
  return {
    name: `write-strategy-${urlPath.replace(/\W/g, '-')}`,
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(urlPath, (req: import('http').IncomingMessage, res: import('http').ServerResponse) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString('utf-8')
            fs.writeFileSync(filePath, body, 'utf-8')
            res.statusCode = 200
            res.end('ok')
          } catch {
            res.statusCode = 500
            res.end('Write failed')
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    serveStrategyFile('/hypotheses.md', path.join(projectRoot, 'strategy', 'hypotheses.md')),
    serveStrategyFile('/gap-analysis.md', path.join(projectRoot, 'strategy', 'gap-analysis.md')),
    serveStrategyFile('/gap-definer-actions.md', path.join(projectRoot, 'execution', 'queue', 'gap-definer-actions.md')),
    writeStrategyFile('/api/hypotheses', path.join(projectRoot, 'strategy', 'hypotheses.md')),
  ],
})
