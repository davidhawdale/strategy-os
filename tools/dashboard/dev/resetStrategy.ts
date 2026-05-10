import fs from 'fs';
import path from 'path';

export interface ArchiveManifest {
  createdAt: string;
  copiedFiles: string[];
  skippedFiles: string[];
}

export interface ArchiveResult {
  snapshotDir: string;
  manifest: ArchiveManifest;
}

export interface ResetStrategyOptions {
  archive?: boolean;
  now?: Date;
}

const STRATEGY_FILES = [
  'strategy/problem.md',
  'strategy/hypotheses.md',
  'strategy/gap-analysis.md',
];

function formatSnapshotTimestamp(now: Date): string {
  return now.toISOString().replace(/[:.]/g, '-');
}

function createUniqueSnapshotDir(root: string, now: Date): string {
  const snapshotsDir = path.join(root, 'archive', 'dashboard-snapshots');
  const timestamp = formatSnapshotTimestamp(now);
  let snapshotDir = path.join(snapshotsDir, timestamp);
  let suffix = 1;

  while (fs.existsSync(snapshotDir)) {
    snapshotDir = path.join(snapshotsDir, `${timestamp}-${suffix}`);
    suffix += 1;
  }

  fs.mkdirSync(snapshotDir, { recursive: true });
  return snapshotDir;
}

function copyIfPresent(root: string, snapshotDir: string, relativePath: string, manifest: ArchiveManifest) {
  const sourcePath = path.join(root, relativePath);
  if (!fs.existsSync(sourcePath)) {
    manifest.skippedFiles.push(relativePath);
    return;
  }

  const destinationPath = path.join(snapshotDir, relativePath);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
  manifest.copiedFiles.push(relativePath);
}

export function archiveCurrentStrategy(root: string, now = new Date()): ArchiveResult {
  const snapshotDir = createUniqueSnapshotDir(root, now);
  const manifest: ArchiveManifest = {
    createdAt: now.toISOString(),
    copiedFiles: [],
    skippedFiles: [],
  };

  for (const relativePath of STRATEGY_FILES) {
    copyIfPresent(root, snapshotDir, relativePath, manifest);
  }

  const queueDir = path.join(root, 'execution', 'queue');
  if (fs.existsSync(queueDir)) {
    for (const file of fs.readdirSync(queueDir).sort()) {
      if (file === '.gitkeep') continue;
      const relativePath = path.join('execution', 'queue', file);
      const sourcePath = path.join(root, relativePath);
      if (fs.statSync(sourcePath).isFile()) {
        copyIfPresent(root, snapshotDir, relativePath, manifest);
      }
    }
  } else {
    manifest.skippedFiles.push('execution/queue');
  }

  fs.writeFileSync(
    path.join(snapshotDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf-8',
  );

  return { snapshotDir, manifest };
}

export function resetStrategyFiles(root: string) {
  const problemPath = path.join(root, 'strategy', 'problem.md');
  if (fs.existsSync(problemPath)) fs.unlinkSync(problemPath);

  fs.copyFileSync(
    path.join(root, 'templates', 'hypotheses.md'),
    path.join(root, 'strategy', 'hypotheses.md'),
  );
  fs.copyFileSync(
    path.join(root, 'templates', 'gap-analysis.md'),
    path.join(root, 'strategy', 'gap-analysis.md'),
  );

  const queueDir = path.join(root, 'execution', 'queue');
  for (const file of fs.readdirSync(queueDir)) {
    if (file !== '.gitkeep') fs.unlinkSync(path.join(queueDir, file));
  }
}

export function resetStrategyWorkspace(root: string, options: ResetStrategyOptions = {}) {
  const archive = options.archive
    ? archiveCurrentStrategy(root, options.now)
    : undefined;

  resetStrategyFiles(root);

  return { archive };
}
