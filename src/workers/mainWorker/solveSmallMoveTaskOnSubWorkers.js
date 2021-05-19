import { DeepeningTask, oneDeeper, resolveDepth } from '../../../chss-module-engine/src/engine/engine';

export const solveSmallMoveTaskOnSubWorkers = async({ smallMoveTask, getNextAvailableWorker }) => new Promise(async(resolve) => {
  let aborted = false;

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

  const tasksLength = deepeningTask.smallDeepeningTasks.length - 1;
  while (deepeningTask.smallDeepeningTasks.length > 1) {
    if (aborted) return;
    const { worker, release } = await getNextAvailableWorker();

    if (aborted) {
      release();
      return;
    }

    const smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
    smallDeepeningTask.progress = deepeningTask.progress

    worker.onmessage = ({ data }) => {
      data.value = data.score;
      res.push(data);

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
