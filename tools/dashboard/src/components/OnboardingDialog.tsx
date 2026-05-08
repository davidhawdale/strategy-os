import { useState } from 'react';
import type { RegisterSeed } from '../utils/generateSeedFile';

interface Props {
  onDismiss: () => void;
  onGenerate: (seed: RegisterSeed) => void;
}

export function OnboardingDialog({ onDismiss, onGenerate }: Props) {
  const [problem, setProblem] = useState('');
  const [constraints, setConstraints] = useState('');
  const [successCriteria, setSuccessCriteria] = useState('');

  const isReady =
    problem.trim().length >= 10 &&
    constraints.trim().length >= 10 &&
    successCriteria.trim().length >= 10;

  function handleSubmit() {
    if (!isReady) return;
    onGenerate({ problem: problem.trim(), constraints: constraints.trim(), successCriteria: successCriteria.trim() });
  }

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-dialog">
        <div className="onboarding-header">
          <h2 className="onboarding-title" id="onboarding-title">Strategy Command Centre</h2>
          <p className="onboarding-subtitle">
            No strategy register found. Answer three questions to generate a starter file,
            then save it to <code>strategy/hypotheses.md</code> and click Refresh.
          </p>
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-problem">
            1. What is the problem?
          </label>
          <p className="onboarding-hint">The pain or opportunity you are targeting — independent of any solution.</p>
          <textarea
            id="onboarding-problem"
            className="onboarding-textarea"
            rows={3}
            value={problem}
            onChange={e => setProblem(e.target.value)}
            placeholder="e.g. Small business owners in the Borders spend 4+ hours per week on manual invoicing with no local support..."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-constraints">
            2. What are the constraints?
          </label>
          <p className="onboarding-hint">Time, resource, geographic, regulatory, or strategic limits that bound the solution.</p>
          <textarea
            id="onboarding-constraints"
            className="onboarding-textarea"
            rows={3}
            value={constraints}
            onChange={e => setConstraints(e.target.value)}
            placeholder="e.g. Bootstrap budget, 6-month runway, must be viable in a 100k-population geography..."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-success">
            3. What does success look like?
          </label>
          <p className="onboarding-hint">The observable outcome that would make this worth pursuing.</p>
          <textarea
            id="onboarding-success"
            className="onboarding-textarea"
            rows={3}
            value={successCriteria}
            onChange={e => setSuccessCriteria(e.target.value)}
            placeholder="e.g. 50 paying subscribers at £X/month within 6 months, with a clear path to 200..."
          />
        </div>

        <div className="onboarding-actions">
          <button className="onboarding-skip" onClick={onDismiss}>
            Skip for now →
          </button>
          <button
            className="onboarding-primary"
            onClick={handleSubmit}
            disabled={!isReady}
          >
            Build Hypotheses
          </button>
        </div>
      </div>
    </div>
  );
}
