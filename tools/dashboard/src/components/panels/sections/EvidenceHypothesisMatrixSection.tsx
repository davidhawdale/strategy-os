import type { EvidenceQualityView } from '../../../model/types';
import './EvidenceHypothesisMatrixSection.css';

interface Props {
  hypotheses: EvidenceQualityView['byHypothesis'];
}

function qualityClass(score: number) {
  if (score >= 0.7) return 'good';
  if (score >= 0.4) return 'fair';
  return 'poor';
}

export function EvidenceHypothesisMatrixSection({ hypotheses }: Props) {
  return (
    <div className="evidence-matrix">
      <h3 className="section-heading">By Hypothesis</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <caption className="sr-only">Evidence tier breakdown by hypothesis</caption>
          <thead>
            <tr>
              <th>Hypothesis</th>
              <th style={{ textAlign: 'center' }}>T1</th>
              <th style={{ textAlign: 'center' }}>T2</th>
              <th style={{ textAlign: 'center' }}>T3</th>
              <th style={{ textAlign: 'center' }}>Total</th>
              <th style={{ textAlign: 'center' }}>Quality</th>
            </tr>
          </thead>
          <tbody>
            {hypotheses.map(hypothesis => (
              <tr key={hypothesis.id}>
                <td className="text-semibold">{hypothesis.label}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="tier-count tier-count--t1">{hypothesis.tierBreakdown.t1}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="tier-count tier-count--t2">{hypothesis.tierBreakdown.t2}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="tier-count tier-count--t3">{hypothesis.tierBreakdown.t3}</span>
                </td>
                <td style={{ textAlign: 'center' }}>{hypothesis.totalEvidence}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`quality-score quality-score--${qualityClass(hypothesis.qualityScore)}`}>
                    {Math.round(hypothesis.qualityScore * 100)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
