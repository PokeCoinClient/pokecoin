import { useEffect, useMemo } from 'react';

function makeWorkerApiAndCleanup() {
  const workerApi = new ComlinkWorker(
    new URL('./worker.js', import.meta.url),
    {}
  );
  const cleanup = () => {
    workerApi.releaseProxy();
  };
  return { workerApi, cleanup };
}

function useWorker() {
  const workerApiAndCleanup = useMemo(() => makeWorkerApiAndCleanup(), []);
  useEffect(() => {
    const { cleanup } = workerApiAndCleanup;
    return () => {
      cleanup();
    };
  }, [workerApiAndCleanup]);

  return workerApiAndCleanup;
}

export default useWorker;
