import { useState } from 'react';

type Mode = 'bootstrap' | 'venture' | 'extension';

export interface RegisterSeed {
  problem: string;
  goals: string;
  capabilities: string;
  mode: Mode;
  otherConstraints: string;
}

interface Props {
  onDismiss: () => void;
  onGenerate: (seed: RegisterSeed) => void;
}

export function OnboardingDialog({ onDismiss, onGenerate }: Props) {
  const [problem, setProblem] = useState('');
  const [goals, setGoals] = useState('');
  const [capabilities, setCapabilities] = useState('');
  const [mode, setMode] = useState<Mode | null>(null);
  const [otherConstraints, setOtherConstraints] = useState('');

  const isReady =
    problem.trim().length >= 10 &&
    goals.trim().length >= 10 &&
    capabilities.trim().length >= 10 &&
    mode !== null;

  function handleSubmit() {
    if (!isReady || !mode) return;
    onGenerate({
      problem: problem.trim(),
      goals: goals.trim(),
      capabilities: capabilities.trim(),
      mode,
      otherConstraints: otherConstraints.trim(),
    });
  }

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-dialog">
        <div className="onboarding-header">
          <h2 className="onboarding-title" id="onboarding-title">Strategy Command Centre</h2>
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-problem">
            1. What is the problem or opportunity?
          </label>
          <p className="onboarding-hint">Who, what, why, where, and when?</p>
          <textarea
            id="onboarding-problem"
            className="onboarding-textarea"
            rows={3}
            value={problem}
            onChange={e => setProblem(e.target.value)}
            placeholder="e.g. The new checkout page (where) has caused a 20% drop in conversion rates (what) among mobile users (who) during the last month (when), leading to an estimated loss of $15,000 in monthly revenue (why)."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-goals">
            2. What outcome would make this worth the effort?
          </label>
          <p className="onboarding-hint">Revenue target, exit, community impact — whatever it is.</p>
          <textarea
            id="onboarding-goals"
            className="onboarding-textarea"
            rows={3}
            value={goals}
            onChange={e => setGoals(e.target.value)}
            placeholder="e.g. 50 paying subscribers at £X/month within 6 months, with a clear path to 200..."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-capabilities">
            3. What can you build?
          </label>
          <p className="onboarding-hint">Resources, timeline, and budget at your disposal.</p>
          <div className="onboarding-mode-toggle" role="group" aria-label="Mode">
            {(['bootstrap', 'venture', 'extension'] as Mode[]).map(m => (
              <button
                key={m}
                type="button"
                className={`onboarding-mode-pill${mode === m ? ' onboarding-mode-pill--active' : ''}`}
                onClick={() => setMode(m)}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
          <textarea
            id="onboarding-capabilities"
            className="onboarding-textarea"
            rows={3}
            value={capabilities}
            onChange={e => setCapabilities(e.target.value)}
            placeholder="e.g. Solo founder, 6-month runway, £10k budget, full-stack developer, no existing distribution..."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-constraints">
            4. Any other constraints or opportunities?
          </label>
          <p className="onboarding-hint">Regulatory, geographic, strategic, or partnership factors.</p>
          <textarea
            id="onboarding-constraints"
            className="onboarding-textarea"
            rows={2}
            value={otherConstraints}
            onChange={e => setOtherConstraints(e.target.value)}
            placeholder="Optional — e.g. Must comply with UK data protection law; existing partnership with regional council..."
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
