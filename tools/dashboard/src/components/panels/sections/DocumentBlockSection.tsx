import { DataTable } from '../../shared/DataTable';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import './DocumentBlockSection.css';

interface Props {
  title: string;
  text?: string;
}

type Block =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export function DocumentBlockSection({ title, text }: Props) {
  if (!text?.trim()) return null;

  return (
    <section className="detail-section document-block-section">
      <h3 className="section-heading">{title}</h3>
      <div className="document-block-section__content">
        {parseDocumentBlocks(text).map((block, index) => (
          <DocumentBlock key={index} block={block} title={title} />
        ))}
      </div>
    </section>
  );
}

function DocumentBlock({ block, title }: { block: Block; title: string }) {
  if (block.type === 'table') {
    return (
      <DataTable<string[]>
        compact
        caption={title}
        data={block.rows}
        columns={block.headers.map((header, index) => ({
          key: `${header}-${index}`,
          header,
          render: row => <InlineMarkdownText text={row[index] ?? ''} />,
        }))}
      />
    );
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag className="document-block-section__list">
        {block.items.map((item, index) => (
          <li key={index}>
            <InlineMarkdownText text={item} />
          </li>
        ))}
      </ListTag>
    );
  }

  return (
    <p className="document-block-section__paragraph">
      <InlineMarkdownText text={block.lines.join(' ')} />
    </p>
  );
}

function parseDocumentBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      const table = parseMarkdownTable(tableLines);
      if (table) blocks.push(table);
      continue;
    }

    if (/^(?:[-*]\s+|\d+\.\s+)/.test(line)) {
      const items: string[] = [];
      const ordered = /^\d+\.\s+/.test(line);
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        if (!itemLine) break;
        const markerPattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
        if (!markerPattern.test(itemLine)) break;
        items.push(itemLine.replace(markerPattern, '').trim());
        index += 1;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (!paragraphLine || paragraphLine.startsWith('|') || /^(?:[-*]\s+|\d+\.\s+)/.test(paragraphLine)) break;
      paragraphLines.push(paragraphLine);
      index += 1;
    }
    blocks.push({ type: 'paragraph', lines: paragraphLines });
  }

  return blocks;
}

function parseMarkdownTable(lines: string[]): Block | undefined {
  if (lines.length < 2) return undefined;
  const headers = splitTableRow(lines[0]);
  const divider = splitTableRow(lines[1]);
  if (headers.length === 0 || divider.length === 0 || !divider.every(cell => /^:?-{2,}:?$/.test(cell))) {
    return undefined;
  }

  const rows = lines.slice(2)
    .map(splitTableRow)
    .filter(row => row.some(cell => cell.trim().length > 0));

  return { type: 'table', headers, rows };
}

function splitTableRow(line: string): string[] {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim());
}
