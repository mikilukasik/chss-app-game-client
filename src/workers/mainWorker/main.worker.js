import { msgClient } from '../../../msg/src/client';
import { solveSmallMoveTaskOnSubWorkers } from './solveSmallMoveTaskOnSubWorkers';
import { solveSmallMoveTaskThroughMainThread, initMainThreadTaskSolver } from './solveSmallMoveTaskThroughMainThread';
import { createSubWorkerPool } from '../subWorkerPool';
import { mainWorkerLogger } from './mainWorkerLogger';

// catch and log errors from this worker
(async() => {
  const workersSocket = msgClient.ws(`ws://${typeof self === 'undefined' || self.location.hostname}:3300/workersSocket`);
  workersSocket.on('init', (data, comms) => {
    comms.send('ok');
  });

  if (!self.Worker) {
    // iOS doesn't support worker in worker, main thread will create the worker pool
    initMainThreadTaskSolver();

    workersSocket.on('solveSmallMoveTask', async(smallMoveTask, comms) => {
      solveSmallMoveTaskThroughMainThread(smallMoveTask).then(comms.send);
    });

    return;
  }

  const { getNextAvailableWorker } = createSubWorkerPool();

  workersSocket.on('solveSmallMoveTask', async(smallMoveTask, comms) => {
    solveSmallMoveTaskOnSubWorkers({ smallMoveTask, getNextAvailableWorker }).then(comms.send);
  });
})();
