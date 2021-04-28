import { DeepeningTask, oneDeeper, resolveDepth } from '../../../chss-engine/src/engine/engine';

export const solveSmallMoveTaskOnSubWorkers = async({ smallMoveTask, getNextAvailableWorker }) => new Promise(async(resolve) => {
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

  const tasksLength = deepeningTask.smallDeepeningTasks.length - 1;
  while (deepeningTask.smallDeepeningTasks.length > 1) {
    const smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
    smallDeepeningTask.progress = deepeningTask.progress

    const { worker, release } = await getNextAvailableWorker();
    worker.onmessage = ({ data }) => {
      data.value = data.score;
      res.push(data);
      release();
      if (res.length === tasksLength) evaluateMove();
    };

    worker.postMessage(smallDeepeningTask);
  };
});
