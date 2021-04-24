import { DeepeningTask, oneDeeper, solveDeepeningTask, resolveDepth } from '../../chss-engine/src/engine/engine';
import { msgClient } from '../../msg/src/client';
import { ensureCookies } from '../services/cookieService';


export const initWorkers = async() => {
  console.log('Starting workers..');

  await ensureCookies();
  const workersSocket = msgClient.ws(`ws://${typeof window === 'undefined' || window.location.hostname}:3300/workersSocket`);

  workersSocket.on('solveSmallMoveTask', (smallMoveTask, comms) => {
    const deepeningTask = new DeepeningTask(smallMoveTask)
    oneDeeper(deepeningTask)

    const res = []
    while (deepeningTask.smallDeepeningTasks.length > 1) {
      const smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
      smallDeepeningTask.progress = deepeningTask.progress
      const res2 = solveDeepeningTask(smallDeepeningTask, true)
      res2.value = res2.score
      res[res.length] = res2;
    }

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
  });
};
