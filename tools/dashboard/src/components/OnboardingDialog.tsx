import { useState } from 'react';

type Mode = 'bootstrap' | 'venture' | 'extension';

export interface RegisterSeed {
  futureState: string;
  currentReality: string;
  strategicBet: string;
  mode: Mode;
  validationStandard: string;
}

interface Props {
  onDismiss: () => void;
  onGenerate: (seed: RegisterSeed) => void;
}

export function OnboardingDialog({ onDismiss, onGenerate }: Props) {
  const [futureState, setFutureState] = useState('');
  const [currentReality, setCurrentReality] = useState('');
  const [strategicBet, setStrategicBet] = useState('');
  const [mode, setMode] = useState<Mode | null>(null);
  const [validationStandard, setValidationStandard] = useState('');

  const isReady =
    futureState.trim().length >= 10 &&
    currentReality.trim().length >= 10 &&
    strategicBet.trim().length >= 10 &&
    validationStandard.trim().length >= 10 &&
    mode !== null;

  function handleSubmit() {
    if (!isReady || !mode) return;
    onGenerate({
      futureState: futureState.trim(),
      currentReality: currentReality.trim(),
      strategicBet: strategicBet.trim(),
      mode,
      validationStandard: validationStandard.trim(),
    });
  }

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-dialog">
        <div className="onboarding-header">
          <h2 className="onboarding-title" id="onboarding-title">Strategy Command Centre</h2>
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-future-state">
            1. Future State
          </label>
          <p className="onboarding-hint">What future do you want to explore making true?</p>
          <textarea
            id="onboarding-future-state"
            className="onboarding-textarea"
            rows={3}
            value={futureState}
            onChange={e => setFutureState(e.target.value)}
            placeholder="Describe the destination: what would exist, improve, or become possible if this strategy worked."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-current-reality">
            2. Current Reality
          </label>
          <p className="onboarding-hint">What is true now that makes this worth investigating?</p>
          <textarea
            id="onboarding-current-reality"
            className="onboarding-textarea"
            rows={3}
            value={currentReality}
            onChange={e => setCurrentReality(e.target.value)}
            placeholder="Describe the situation, observation, gap, constraint, trend, or analogue that prompted the question."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-strategic-bet">
            3. Strategic Bet
          </label>
          <p className="onboarding-hint">What belief or move are we testing?</p>
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
            id="onboarding-strategic-bet"
            className="onboarding-textarea"
            rows={3}
            value={strategicBet}
            onChange={e => setStrategicBet(e.target.value)}
            placeholder="Describe the initial product, market, model, expansion, or positioning bet you want the system to investigate."
          />
        </div>

        <div className="onboarding-field">
          <label className="onboarding-label" htmlFor="onboarding-validation-standard">
            4. Validation Standard
          </label>
          <p className="onboarding-hint">What would make this a good bet or a bad bet?</p>
          <textarea
            id="onboarding-validation-standard"
            className="onboarding-textarea"
            rows={3}
            value={validationStandard}
            onChange={e => setValidationStandard(e.target.value)}
            placeholder="Describe what must be true, what evidence would build confidence, and what evidence would kill or change the strategy."
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
