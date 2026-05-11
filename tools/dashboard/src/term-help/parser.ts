import type { TermHelpEntry, TermHelpMap } from './types';

function splitMarkdownRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim());
}

function isDividerRow(cells: string[]) {
  return cells.every(cell => /^:?-{2,}:?$/.test(cell));
}

export function parseTermHelpMarkdown(markdown: string): TermHelpMap {
  const rows = markdown
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('|'))
    .map(splitMarkdownRow);

  if (rows.length < 3) return {};

  const header = rows[0].map(cell => cell.toLowerCase());
  const divider = rows[1];
  if (!isDividerRow(divider)) return {};

  const keyIndex = header.indexOf('key');
  const termIndex = header.indexOf('term');
  const helpIndex = header.indexOf('help text');
  const sourceIndex = header.indexOf('canonical source');
  if (keyIndex < 0 || termIndex < 0 || helpIndex < 0) return {};

  return rows.slice(2).reduce<TermHelpMap>((map, row) => {
    const key = row[keyIndex]?.trim();
    const term = row[termIndex]?.trim();
    const helpText = row[helpIndex]?.trim();
    if (!key || !term || !helpText) return map;

    const entry: TermHelpEntry = {
      key,
      term,
      helpText,
      canonicalSource: sourceIndex >= 0 ? row[sourceIndex]?.trim() || undefined : undefined,
    };
    map[key] = entry;
    return map;
  }, {});
}
