import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'
import { resetStrategyWorkspace } from './dev/resetStrategy'

const projectRoot = path.resolve(__dirname, '..', '..')

function serveStrategyFile(urlPath: string, filePath: string, contentType = 'text/markdown') {
  return {
    name: `serve-strategy-${urlPath.replace(/\W/g, '-')}`,
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(urlPath, (_req, res) => {
        try {
          const content = fs.readFileSync(filePath, 'utf-8')
          res.setHeader('Content-Type', contentType)
          res.end(content)
        } catch {
          res.statusCode = 404
          res.end('Not found')
        }
      })
    },
  }
}

function serveQueueFiles(urlPath: string, queueDir: string) {
  return {
    name: 'serve-queue-files',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(urlPath, (_req, res) => {
        try {
          const files = fs.readdirSync(queueDir)
            .filter(file => file.endsWith('.md'))
            .filter(file => file !== 'gap-definer-actions.md')
            .sort()
            .map(file => ({
              fileName: file,
              content: fs.readFileSync(path.join(queueDir, file), 'utf-8'),
            }))

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ files }))
        } catch {
          res.statusCode = 404
          res.end(JSON.stringify({ files: [] }))
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
        const proc = spawn('/bin/bash', ['-l', '-c', 'claude -p "Run the stg-build-register skill."'], {
          cwd: root,
          detached: true,
          stdio: ['ignore', 'inherit', 'inherit'],
        })
        proc.on('error', err => {
          console.error(`\n[stg-build] Spawn failed: ${err.message}`)
          console.error('[stg-build] Is claude in your PATH? Run: which claude')
        })
        console.log(`\n[stg-build] Build started (PID ${proc.pid}) — watch this terminal`)
        proc.unref()
        res.statusCode = 202
        res.end('Build triggered')
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

function resetStrategy(urlPath: string, root: string) {
  return {
    name: 'reset-strategy',
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
            const body = Buffer.concat(chunks).toString('utf-8').trim()
            const payload = body ? JSON.parse(body) as { archive?: unknown } : {}
            const archive = payload.archive === true
            const result = resetStrategyWorkspace(root, { archive })

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              message: 'Reset complete',
              archived: !!result.archive,
              snapshotDir: result.archive?.snapshotDir,
            }))
          } catch (err) {
            console.error('[reset] Failed:', err)
            res.statusCode = 500
            res.end('Reset failed')
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
    serveStrategyFile('/TERM_HELP.md', path.join(projectRoot, 'TERM_HELP.md')),
    serveStrategyFile('/gap-definer-actions.md', path.join(projectRoot, 'execution', 'queue', 'gap-definer-actions.md')),
    serveQueueFiles('/api/queue-files', path.join(projectRoot, 'execution', 'queue')),
    serveStrategyFile('/problem.md', path.join(projectRoot, 'strategy', 'problem.md')),
    serveStrategyFile('/build-pass-complete.md', path.join(projectRoot, 'strategy', 'build-pass-complete.md')),
    serveStrategyFile(
      '/build-pass-complete.provenance.json',
      path.join(projectRoot, 'strategy', 'build-pass-complete.provenance.json'),
      'application/json'
    ),
    writeStrategyFile('/api/problem', path.join(projectRoot, 'strategy', 'problem.md')),
    triggerBuild('/api/build', projectRoot),
    resetStrategy('/api/reset', projectRoot),
  ],
})
