import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  archiveCurrentStrategy,
  resetStrategyFiles,
  resetStrategyWorkspace,
} from '../resetStrategy';

let root: string;

function writeFile(relativePath: string, content: string) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

function readFile(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), 'utf-8');
}

function createWorkspace() {
  writeFile('templates/hypotheses.md', 'default hypotheses');
  writeFile('templates/gap-analysis.md', 'default gap analysis');
  writeFile('strategy/problem.md', 'current problem');
  writeFile('strategy/hypotheses.md', 'current hypotheses');
  writeFile('strategy/gap-analysis.md', 'current gap analysis');
  writeFile('execution/queue/.gitkeep', '');
  writeFile('execution/queue/T-01-task.md', 'task');
  writeFile('execution/queue/E-01-decision.md', 'decision');
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'dashboard-reset-'));
  createWorkspace();
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('reset strategy workspace', () => {
  it('archives strategy and queue markdown files into a timestamped snapshot', () => {
    const result = archiveCurrentStrategy(root, new Date('2026-05-10T13:59:37.000Z'));
    const snapshotRelative = path.relative(root, result.snapshotDir);

    expect(snapshotRelative).toBe(path.join('archive', 'dashboard-snapshots', '2026-05-10T13-59-37-000Z'));
    expect(readFile(path.join(snapshotRelative, 'strategy/problem.md'))).toBe('current problem');
    expect(readFile(path.join(snapshotRelative, 'strategy/hypotheses.md'))).toBe('current hypotheses');
    expect(readFile(path.join(snapshotRelative, 'strategy/gap-analysis.md'))).toBe('current gap analysis');
    expect(readFile(path.join(snapshotRelative, 'execution/queue/T-01-task.md'))).toBe('task');
    expect(readFile(path.join(snapshotRelative, 'execution/queue/E-01-decision.md'))).toBe('decision');
    expect(fs.existsSync(path.join(result.snapshotDir, 'execution/queue/.gitkeep'))).toBe(false);

    const manifest = JSON.parse(readFile(path.join(snapshotRelative, 'manifest.json'))) as {
      copiedFiles: string[];
      skippedFiles: string[];
    };
    expect(manifest.copiedFiles).toContain('strategy/problem.md');
    expect(manifest.copiedFiles).toContain(path.join('execution', 'queue', 'T-01-task.md'));
    expect(manifest.skippedFiles).toEqual([]);
  });

  it('records missing optional files as skipped instead of failing archive creation', () => {
    fs.unlinkSync(path.join(root, 'strategy/problem.md'));

    const result = archiveCurrentStrategy(root, new Date('2026-05-10T13:59:37.000Z'));
    const manifest = JSON.parse(fs.readFileSync(path.join(result.snapshotDir, 'manifest.json'), 'utf-8')) as {
      copiedFiles: string[];
      skippedFiles: string[];
    };

    expect(manifest.skippedFiles).toContain('strategy/problem.md');
    expect(manifest.copiedFiles).toContain('strategy/hypotheses.md');
  });

  it('resets strategy files from templates and clears queue content', () => {
    resetStrategyFiles(root);

    expect(fs.existsSync(path.join(root, 'strategy/problem.md'))).toBe(false);
    expect(readFile('strategy/hypotheses.md')).toBe('default hypotheses');
    expect(readFile('strategy/gap-analysis.md')).toBe('default gap analysis');
    expect(fs.existsSync(path.join(root, 'execution/queue/.gitkeep'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'execution/queue/T-01-task.md'))).toBe(false);
    expect(fs.existsSync(path.join(root, 'execution/queue/E-01-decision.md'))).toBe(false);
  });

  it('archives before resetting when requested', () => {
    const result = resetStrategyWorkspace(root, {
      archive: true,
      now: new Date('2026-05-10T13:59:37.000Z'),
    });

    expect(result.archive).toBeDefined();
    expect(fs.existsSync(path.join(result.archive?.snapshotDir ?? '', 'strategy/problem.md'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'strategy/problem.md'))).toBe(false);
    expect(readFile('strategy/hypotheses.md')).toBe('default hypotheses');
  });

  it('does not reset when archive creation fails', () => {
    writeFile('archive/dashboard-snapshots', 'not a directory');

    expect(() => resetStrategyWorkspace(root, {
      archive: true,
      now: new Date('2026-05-10T13:59:37.000Z'),
    })).toThrow();

    expect(readFile('strategy/problem.md')).toBe('current problem');
    expect(readFile('strategy/hypotheses.md')).toBe('current hypotheses');
    expect(fs.existsSync(path.join(root, 'execution/queue/T-01-task.md'))).toBe(true);
  });
});
