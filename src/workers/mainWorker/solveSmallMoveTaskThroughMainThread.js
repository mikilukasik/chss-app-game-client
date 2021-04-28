import uuid from 'uuid-random';
import { mainWorkerLogger } from './mainWorkerLogger';

const smallMoveTaskResolvers = {};

export const initMainThreadTaskSolver = () => new Promise((resolve) => {

  postMessage({ command: 'initWorkerPool' });
  onmessage = ({ data: { command, result, smallMoveTaskId } }) => {
    switch (command) {
      case 'workerPoolReady':
        resolve();
        break;
    
      case 'smallMoveTaskResult':
        smallMoveTaskResolvers[smallMoveTaskId](result);
        delete smallMoveTaskResolvers[smallMoveTaskId];
        break;

      default:
        break;
    }
  };
});


export const solveSmallMoveTaskThroughMainThread = async(smallMoveTask) => new Promise(async(resolve) => {
  const smallMoveTaskId = uuid();
  smallMoveTaskResolvers[smallMoveTaskId] = resolve;
  postMessage({ command: 'solveSmallMoveTask', smallMoveTask, smallMoveTaskId });
});
