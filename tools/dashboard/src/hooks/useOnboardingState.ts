import { useCallback, useEffect, useState } from 'react';
import type { RegisterSeed } from '../components/OnboardingDialog';

export function useOnboardingState(fetchData: () => void) {
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const [buildTriggered, setBuildTriggered] = useState(false);

  useEffect(() => {
    fetch('/problem.md')
      .then(r => { if (r.ok) setOnboardingDismissed(true); })
      .catch(() => {});
  }, []);

  const resetStrategy = useCallback(async () => {
    if (!window.confirm('Danger Will Robinson — this will delete problem.md, reset both strategy files, and clear the execution queue. Continue?')) return;
    const res = await fetch('/api/reset', { method: 'POST' });
    if (res.ok) {
      setOnboardingDismissed(false);
      setBuildTriggered(false);
      fetchData();
    }
  }, [fetchData]);

  const generate = useCallback(async (seed: RegisterSeed) => {
    const today = new Date().toISOString().slice(0, 10);
    const constraints = seed.otherConstraints.trim() || 'None';
    const content = [
      '# Strategy Seed',
      '',
      `Date: ${today}`,
      `Mode: ${seed.mode.toUpperCase()}`,
      '',
      '## Problem or Opportunity',
      seed.problem,
      '',
      '## Goals',
      seed.goals,
      '',
      '## Capabilities and Resources',
      seed.capabilities,
      '',
      '## Other Constraints',
      constraints,
    ].join('\n');

    const problemRes = await fetch('/api/problem', {
      method: 'POST',
      headers: { 'Content-Type': 'text/markdown' },
      body: content,
    });

    if (problemRes.ok) {
      setOnboardingDismissed(true);
      setBuildTriggered(true);
      fetchData();
      fetch('/api/build', { method: 'POST' }).catch(() => {});
    }
  }, [fetchData]);

  return {
    onboardingDismissed,
    setOnboardingDismissed,
    buildTriggered,
    setBuildTriggered,
    resetStrategy,
    generate,
  };
}
