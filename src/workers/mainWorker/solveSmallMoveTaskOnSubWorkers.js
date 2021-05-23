import { moveIt, tableToAptString } from '../../../../chss-service-game-handler/chss-module-engine/src/engine/engine';
import { DeepeningTask, oneDeeper, resolveDepth, captured, coordsToMoveString } from '../../../chss-module-engine/src/engine/engine';
let i = 0
export const solveSmallMoveTaskOnSubWorkers = ({ smallMoveTask, getNextAvailableWorker }) => new Promise(async(resolve) => {
  let aborted = false;

  const deepeningTask = new DeepeningTask(smallMoveTask)
  oneDeeper(deepeningTask)

  const res = []
  const evaluateMove = () => {
    const tempResolveArray = []
    tempResolveArray[1] = []
    tempResolveArray[2] = res
    tempResolveArray[3] = []

    resolveDepth(2, tempResolveArray, smallMoveTask.currentBests, undefined, deepeningTask)
    const pushAgain = tempResolveArray[1][0]
    if (!pushAgain) {
      // opponent has no moves, check if it's a win
      const isWin = captured(moveIt(smallMoveTask.moveCoords, smallMoveTask.sharedData.origTable), !smallMoveTask.sharedData.origWNext);
      
      if (isWin) return resolve({
        move: smallMoveTask.moveCoords,
        score: 30000,
        value: 30000,
        moveTree: [smallMoveTask.moveCoords, 'WIN']
      });
      // this move would yield a draw.

      if (smallMoveTask.shouldIDraw) return resolve({
        move: smallMoveTask.moveCoords,
        score: 6000,
        value: 6000,
        moveTree: [smallMoveTask.moveCoords, 'DRAW']
      });
      
      return resolve({
        move: smallMoveTask.moveCoords,
        score: -6000,
        value: -6000,
        moveTree: [smallMoveTask.moveCoords, 'DRAW']
      });
    }
    
    if (!pushAgain.moveTree) {
      // I *think* this happens when there are no return moves
      pushAgain.moveTree = [smallMoveTask.moveCoords, pushAgain.value]
    }

    const moveCoords = pushAgain.moveTree[0]

    const firstMovedTableApt = tableToAptString(moveIt(moveCoords, smallMoveTask.sharedData.origTable));
    const wouldLoop = smallMoveTask.sharedData.repeatedPastTables.includes(firstMovedTableApt);
    if (wouldLoop) {
      console.log('it would loop', smallMoveTask.sharedData.repeatedPastTables)
      pushAgain.value = smallMoveTask.shouldIDraw
        ? pushAgain.value + 6000
        : pushAgain.value - 6000;
    }

    pushAgain.score = pushAgain.value
    pushAgain.move = moveCoords

    resolve(pushAgain)
  };

  const mergeCurrentBests = (receivedCurrentBests) => {
    const valueToUse = receivedCurrentBests[2];
    deepeningTask.smallDeepeningTasks.forEach(sdt => {
      sdt.currentBests[2] = sdt.currentBests[2]
        ? Math.min(sdt.currentBests[2], valueToUse)
        : valueToUse;
    });
  }

  let tasksLength = deepeningTask.smallDeepeningTasks.length - 1;
  while (deepeningTask.smallDeepeningTasks.length > 1) {
    if (aborted) return;
    const { worker, release } = await getNextAvailableWorker();

    if (aborted) {
      release();
      return;
    }

    const smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
    smallDeepeningTask.progress = deepeningTask.progress
    smallDeepeningTask.repeatedPastTables = smallMoveTask.sharedData.repeatedPastTables

    worker.onmessage = ({ data }) => {
      if (!data) {
        // that was an illegal return move
        tasksLength -= 1;
        release();
        if (res.length === tasksLength) evaluateMove();
        return;
      }

      data.value = data.score;
      res.push(data);

      // prune
      if (data.score < data.currentBests[1]) {
        // abort, server already has a better move than this
        evaluateMove();
        release();
        deepeningTask.smallDeepeningTasks.length = 0;
        aborted = true;
        return;
      }

      mergeCurrentBests(data.currentBests);
      release();
      if (res.length === tasksLength) evaluateMove();
    };

    worker.postMessage(smallDeepeningTask);
  };
});
