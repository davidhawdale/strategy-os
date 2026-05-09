import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'

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

function triggerBuild(urlPath: string, root: string) {
  return {
    name: `trigger-build`,
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(urlPath, (req: import('http').IncomingMessage, res: import('http').ServerResponse) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        try {
          const skillPath = path.join(root, '.claude', 'skills', 'stg-build-register', 'SKILL.md')
          const seedPath = path.join(root, 'strategy', 'problem.md')
          const skill = fs.readFileSync(skillPath, 'utf-8')
          const seed = fs.readFileSync(seedPath, 'utf-8')
          const prompt = `${skill}\n\n---\n\n${seed}\n\nbuild`
          spawn('claude', ['-p', prompt], {
            cwd: root,
            detached: true,
            stdio: 'inherit',
          }).unref()
          res.statusCode = 202
          res.end('Build triggered')
        } catch {
          res.statusCode = 500
          res.end('Build trigger failed')
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
    serveStrategyFile('/problem.md', path.join(projectRoot, 'strategy', 'problem.md')),
    writeStrategyFile('/api/problem', path.join(projectRoot, 'strategy', 'problem.md')),
    triggerBuild('/api/build', projectRoot),
  ],
})
