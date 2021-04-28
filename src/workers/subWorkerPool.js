import { getHardwareConcurrency } from "../services/speedService";
import SubWorker from './subWorker/sub.worker.js'

export const createSubWorkerPool = () => {
  let isReady;
  const resolversWaitingForReady = [];
  const subWorkerPool = [];
  const busyWorkerIndexes = {};
  const nextAvailableWorkerResolvers = [];

  const init = async() => {
    for (let i = getHardwareConcurrency(); i > 0; i -= 1) subWorkerPool.push(SubWorker());
  
    // init them with hello
    await Promise.all(subWorkerPool.map(worker => new Promise(resolve => {
      worker.onmessage = resolve;
      worker.postMessage({ command: 'hello' });
    })));

    isReady = true;
    resolversWaitingForReady.forEach(r => r());
  };

  const waitForReady = () => new Promise((resolve) => {
    if (isReady) return resolve();
    resolversWaitingForReady.push(resolve);
  });

  const getNextAvailableWorker = async() => {
    await waitForReady();
    const availableWorkerIndex = subWorkerPool.findIndex((worker, index) => !busyWorkerIndexes[index]);
    const availableWorker = subWorkerPool[availableWorkerIndex];
    if (!availableWorker) return new Promise(resolve => nextAvailableWorkerResolvers.push(resolve));
    busyWorkerIndexes[availableWorkerIndex] = true;
    const workerObject = {
      worker: availableWorker, 
      release: () => {
        const waitingResolver = nextAvailableWorkerResolvers.shift();
        if (waitingResolver) return waitingResolver(workerObject);

        delete busyWorkerIndexes[availableWorkerIndex];
      },
    };
    return workerObject;
  };

  init();

  return {
    getNextAvailableWorker,
  };
};
