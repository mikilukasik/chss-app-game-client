import { ensureCookies } from '../services/cookieService';
import MainWorker from './mainWorker/main.worker.js'
import { solveSmallMoveTaskOnSubWorkers } from './mainWorker/solveSmallMoveTaskOnSubWorkers';
import { createSubWorkerPool } from './subWorkerPool';

export const initWorkers = async() => {
  await ensureCookies();

  const mainWorker = new MainWorker();
  let getNextAvailableWorker;

  mainWorker.onmessage = async({ data: { command, smallMoveTask, smallMoveTaskId } }) => {
    switch (command) {
      case 'initWorkerPool':
        getNextAvailableWorker = createSubWorkerPool().getNextAvailableWorker;

        mainWorker.postMessage({ command: 'workerPoolReady'});
        break;
    
      case 'solveSmallMoveTask':
        const result = await solveSmallMoveTaskOnSubWorkers({ smallMoveTask, getNextAvailableWorker });
        mainWorker.postMessage({ command: 'smallMoveTaskResult', result, smallMoveTaskId });
        break;

      default:
        break;
    }
  };
};
