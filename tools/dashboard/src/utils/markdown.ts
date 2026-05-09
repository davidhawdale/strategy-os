export function stripMd(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
}

export function parseEntry(entry: string): { name: string; desc?: string } {
  const clean = stripMd(entry).replace(/\s*[\[(]PRIMARY[\])]/i, '').trim();
  const dashIdx = clean.indexOf(' — ');
  if (dashIdx !== -1) {
    return { name: clean.slice(0, dashIdx).trim(), desc: clean.slice(dashIdx + 3).trim() };
  }
  return { name: clean };
}
