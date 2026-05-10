import { useEffect } from 'react';

export function useBuildPolling(enabled: boolean, fetchData: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
  }, [enabled, fetchData]);
}
