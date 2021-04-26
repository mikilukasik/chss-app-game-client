import { DeepeningTask, oneDeeper, solveDeepeningTask, resolveDepth } from '../../../chss-engine/src/engine/engine';
import { msgClient } from '../../../msg/src/client';
import { getHardwareConcurrency } from '../../services/speedService';
import Worker from '../subWorker/sub.worker.js'
import uuid from 'uuid-random';
import { clientLogger } from '../../../chss-service-logger';
// import { logger } from '../..';
clientLogger({ msgClient });

(async() => {
  const workersSocket = msgClient.ws(`ws://${typeof self === 'undefined' || self.location.hostname}:3300/workersSocket`);

  if (!self.Worker) {
    // iOS doesn't support worker in worker
    // postMessage('initWorkerPool');
  }

  const subWorkerPool = [];
  for (let i = getHardwareConcurrency(); i > 0; i -= 1) subWorkerPool.push(Worker());

  // init them with hello
  await Promise.all(subWorkerPool.map(worker => new Promise(resolve => {
    worker.onmessage = resolve;
    worker.postMessage({ command: 'hello' });
  })));

  const busyWorkerIndexes = {};
  const nextAvailableWorkerResolvers = [];
  const getNextAvailableWorker = async() => {
    const availableWorkerIndex = subWorkerPool.findIndex((worker, index) => !busyWorkerIndexes[index]);
    const availableWorker = subWorkerPool[availableWorkerIndex];
    if (!availableWorker) return new Promise(resolve => nextAvailableWorkerResolvers.push(resolve));
    busyWorkerIndexes[availableWorkerIndex] = true;
    return { worker: availableWorker, index: availableWorkerIndex };
  };

  workersSocket.on('solveSmallMoveTask', async(smallMoveTask, comms) => {
    const moveTaskId = uuid();
    const deepeningTask = new DeepeningTask(smallMoveTask)
    oneDeeper(deepeningTask)

    const res = []
    const evaluateMove = () => {
      const tempResolveArray = []
      tempResolveArray[1] = []
      tempResolveArray[2] = res
      tempResolveArray[3] = []
  
      resolveDepth(2, tempResolveArray)
      const pushAgain = tempResolveArray[1][0]
      const moveCoords = pushAgain.moveTree[0]
      let wouldLoop
  
      // TODO: loop logic can't be here
      // if (!game.moveTask.shouldIDraw) {
      //   const movedTable = moveIt(moveCoords, game.table)
      //   wouldLoop = evalFuncs.checkIfLooped(movedTable, game.allPastTables)
      // } else {
      //   // TODO: offer draw?
      // }
  
      if (wouldLoop) pushAgain.value -= Math.pow(wouldLoop, 5)
      pushAgain.score = pushAgain.value
      pushAgain.move = moveCoords
  
      comms.send(pushAgain)
    };

    const tasksLength = deepeningTask.smallDeepeningTasks.length - 1;
    while (deepeningTask.smallDeepeningTasks.length > 1) {
      const smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
      smallDeepeningTask.progress = deepeningTask.progress

      const { worker, index } = await getNextAvailableWorker();
      worker.onmessage = ({ data }) => {
        data.value = data.score;
        res.push(data);

        const waitingResolver = nextAvailableWorkerResolvers.shift();
        if (waitingResolver) return waitingResolver({ worker, index });

        delete busyWorkerIndexes[index];
        if (res.length === tasksLength) evaluateMove();
      };

      worker.postMessage(smallDeepeningTask);
    }
  });
})()