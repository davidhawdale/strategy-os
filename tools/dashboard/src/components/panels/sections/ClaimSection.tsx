import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import './ClaimSection.css';

interface Props {
  claim?: string;
}

export function ClaimSection({ claim }: Props) {
  if (!claim) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Claim</h3>
      <blockquote className="claim-block"><InlineMarkdownText text={claim} /></blockquote>
    </div>
  );
}
