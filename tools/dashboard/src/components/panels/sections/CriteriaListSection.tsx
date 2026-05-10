import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import './CriteriaListSection.css';

type Tone = 'neutral' | 'success' | 'danger';

interface Props {
  title: string;
  items: string[];
  tone?: Tone;
}

export function CriteriaListSection({ title, items, tone = 'neutral' }: Props) {
  if (items.length === 0) return null;

  return (
    <div className={`criteria-list-section criteria-list-section--${tone}`}>
      <h4 className="proposal-subsection-heading">{title}</h4>
      <ul className="criteria-list">
        {items.map((item, i) => (
          <li key={i}><InlineMarkdownText text={item} /></li>
        ))}
      </ul>
    </div>
  );
}
