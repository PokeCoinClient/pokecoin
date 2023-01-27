import * as Comlink from 'comlink';

function makeWorkerApiAndCleanup() {
  const worker = new Worker(new URL('./worker.js', import.meta.url), {
    type: 'module',
  });
  const workerApi = Comlink.wrap(worker);
  const cleanup = () => {
    worker.terminate();
    workerApi[Comlink.releaseProxy]();
  };
  return { workerApi, cleanup };
}

export default makeWorkerApiAndCleanup;
