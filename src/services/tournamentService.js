import { getMovedBoard } from '../../chss-module-engine/src/engine_new/utils/getMovedBoard';
import * as tf from '@tensorflow/tfjs';

import * as tf_wasm from '@tensorflow/tfjs-backend-wasm';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';

// setWasmPaths('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/');
setWasmPaths('/assets/wasm_bin/');

import { board2fen } from '../../chss-module-engine/src/engine_new/transformers/board2fen';
import { moveInBoard } from '../../chss-module-engine/src/engine/engine';
import { move2moveString } from '../../../chss-module-engine/src/engine_new/transformers/move2moveString';
// tf.setBackend('cpu');

let _tournamentSocket;
const tournamentSocketAwaiters = [];

let wasmInited = false;

const loadedModels = {};

// const getModel = async ({ modelName }) => {
//   if (loadedModels[modelName]) return loadedModels[modelName];

//   console.log(`Loading model ${modelName}...`);

//   let loader;
//   eval(await (await fetch(`http://localhost:3300/models/${modelName}/loader.js`)).text());

//   const { predict } = await loader({
//     tf,
//     modelUrl: `http://localhost:3300/models/${modelName}/model.json`,
//   });

//   loadedModels[modelName] = { predict }; //{ model, transforms };
//   return loadedModels[modelName];
// };

// export const predictMove = async ({ game, modelName }) => {
//   const { predict } = await getModel({ modelName });
//   return predict({ game });
// };

export const getTournamentSocket = async () => {
  if (!wasmInited)
    await tf.setBackend('wasm').then((success) => {
      wasmInited = success;
      // console.log(`wasm init success: ${success}`);
    }, console.error);

  return new Promise((resolve) => {
    if (_tournamentSocket) return resolve(_tournamentSocket);
    tournamentSocketAwaiters.push(resolve);
  });
};

export const useTournamentSocket = (tournamentSocket) => {
  _tournamentSocket = tournamentSocket;
  tournamentSocketAwaiters.forEach((resolve) => resolve(tournamentSocket));
};

const models = {};
const modelsLoading = {};
const getModelResolvers = {};

const loadTransform = async (modelName) => {
  const transformAsString = await (
    await fetch(
      `http://${typeof window === 'undefined' || window.location.hostname}:3300/models/${modelName}/transform.js`,
    )
  ).text();
  return eval(transformAsString);
};

const loadConstants = async (modelName) => {
  return await (
    await fetch(
      `http://${typeof window === 'undefined' || window.location.hostname}:3300/models/${modelName}/constants.json`,
    )
  ).json();
};

const loadTfModel = async (modelName) => {
  console.log(`Loading model ${modelName}`);
  return tf.loadLayersModel(
    `http://${typeof window === 'undefined' || window.location.hostname}:3300/models/${modelName}/model.json`,
  );
};

const loadModel = async (name) => {
  // const [model, transform, constants] = await Promise.all([
  //   loadTfModel(name),
  //   loadTransform(name),
  //   loadConstants(name),
  // ]).catch(console.error);
  // models[name] = { model, transform, constants };

  let loader;
  eval(await (await fetch(`http://localhost:3300/models/${name}/loader.js`)).text());

  const { predict } = await loader({
    tf,
    modelUrl: `http://localhost:3300/models/${name}/model.json`,
  });

  models[name] = { predict };

  console.log(`tf model ${name} loaded`);

  while (getModelResolvers[name].length) getModelResolvers[name].pop()(models[name]);
};

const getModel = (name) =>
  new Promise((r) => {
    if (models[name]) return r(models[name]);
    getModelResolvers[name] = (getModelResolvers[name] || []).concat(r);

    if (!modelsLoading[name]) {
      modelsLoading[name] = true;
      loadModel(name);
    }
  });

export const getPrediction = async ({
  game /*, board, randomValue, repeatedPastFens = [], noLoop = false */,
  modelName,
}) => {
  const {
    // model,
    // transform,
    // constants: { castlingIndex, enPassantIndex, inputLength, needsWNext },
    predict,
  } = await getModel(modelName);

  return predict({ game });

  // let fenStr = board2fen(board);
  // let needsInverseOutput = false;
  // if (needsWNext) {
  //   const { fen, mirrored } = transform.getWhiteNextFen({ fen: fenStr });
  //   fenStr = fen;
  //   needsInverseOutput = mirrored;
  // }

  // if (noLoop && repeatedPastFens.length && repeatedPastFens.includes(fenStr)) {
  //   return null;
  // }

  // // if (repeatedPastFens.includes(fenStr))

  // const inputTensor = tf.tensor(transform.fen2flatArray({ fenStr, castlingIndex, enPassantIndex }), [
  //   1,
  //   8,
  //   8,
  //   inputLength,
  // ]);
  // const outputTensor = model.predict(inputTensor);

  // console.log({ needsInverseOutput });

  // let output = (await outputTensor.data())[0]; //+ randomValue * Math.random();
  // if (needsInverseOutput) output *= -1;
  // // const output = (await outputTensor.data())[0];

  // inputTensor.dispose();
  // outputTensor.dispose();
  // console.log({ output });
  // return output;
};

const indexOfMaxValue = (array) => array.reduce((iMax, x, i, arr) => (x !== null && x > arr[iMax] ? i : iMax), 0);
const indexOfMinValue = (array) => array.reduce((iMin, x, i, arr) => (x !== null && x < arr[iMin] ? i : iMin), 0);

const makeMove = async ({ game, modelName, randomValue = 0 }) => {
  const { nextMoves, wNext, board, repeatedPastFens } = game;
  if (!nextMoves.length) {
    // console.log(game.whiteWon, game.blackWon, game.isDraw);
    // await updateTournamentStats(game);
    return { finished: true };
  }

  // const predictions = [];
  // const taskBatch = [];
  // for (const [nextMoveIndex, nextMove] of nextMoves.entries()) {
  //   const movedBoard = getMovedBoard(nextMove, board);
  //   taskBatch.push(getPrediction(modelName, movedBoard));

  //   if (nextMoveIndex % 5 !== 0 && nextMoveIndex < nextMoves.length - 1) continue;

  //   predictions.push(...(await Promise.all(taskBatch)));
  //   taskBatch.length = 0;
  //   // predictions[nextMoveIndex] = await getPrediction(modelName, movedBoard);
  // }

  // const predictions = await Promise.all(
  //   nextMoves.map((move) => {
  //     const movedBoard = getMovedBoard(move, board);
  //     return getPrediction({ modelName, board: movedBoard, randomValue, repeatedPastFens, noLoop: true });
  //   }),
  // );

  // const moveindex = wNext ? indexOfMaxValue(predictions) : indexOfMinValue(predictions);
  // console.log(`Tensors in memory: ${tf.memory().numTensors}`);
  const { moveValues } = await getPrediction({ game, modelName });
  const sortedMoves = nextMoves.sort((a, b) => moveValues[b] - moveValues[a]);
  // console.log({ s: sortedMoves.map(move2moveString) });

  const move = sortedMoves[0];
  const nextGameState = moveInBoard(move, game);
  // console.log(game.thinkingTimes);
  return { nextGameState };
};

// let smallest = 99999999;

const checkIfDraw = (game) => {
  const { allPastFens, repeatedPastFens, board } = game;

  // check if looped
  for (const repeatedFen of repeatedPastFens) {
    if (allPastFens.filter((f) => f === repeatedFen).length > 2) {
      game.isDraw = true;
      return true;
    }
  }

  // check if kings only
  let totalVal = 0;
  for (let i = 0; i < 64; i += 1) {
    totalVal += board[i];
  }

  if (totalVal === 20) {
    game.isDraw = true;
    return true;
  }
  return false;
};

const autoPlayTournamentGame = async ({
  game,
  displayedStatsUpdater: _dsu,
  displayedGameUpdater,
  updateCurrentGameInStatsDisplay,
  updateTournamentStats,
  rounds,
  randomValue,
}) => {
  let thisGame = Object.assign({}, game);
  // console.log('started', thisGame.wName, thisGame.bName);
  const move = async () => {
    const { nextGameState, finished } = await makeMove({
      randomValue,
      game: thisGame,
      modelName: thisGame.wNext ? thisGame.wName : thisGame.bName,
    });
    // try {
    if (finished) displayedGameUpdater(nextGameState || thisGame);

    if (finished || checkIfDraw(nextGameState)) {
      const gameToReport = nextGameState || thisGame;
      if (!(gameToReport.whiteWon || gameToReport.blackWon || gameToReport.isDraw)) throw 'hiba';

      await updateTournamentStats(gameToReport);
      return;
    }
    // } catch (e) {
    //   console.log({ game, thisGame, move, nextGameState, finished });
    //   throw e;
    // }
    thisGame = nextGameState;

    const updatedGame = Object.assign({}, thisGame);
    // displayedGameUpdater(updatedGame);
    updateCurrentGameInStatsDisplay({ game: updatedGame });

    // await new Promise((r) => setTimeout(r, 0));
    await move();
  };

  await move();
};
const average = (arr) => arr.reduce((p, c) => p + c, 0) / (arr.length || 1);

//failing
// wPlayer: '0.09051-1641237240032_s1k_e100',
//   bPlayer: '0.06629-1641379830422_s1000k_e30',

const getTournamentDataUpdater = ({ displayedStatsUpdater }) => {
  const currentGame = {};
  const tournamentData = {};
  let totalGames, currentGameNumber;

  const getFormattedStats = () => `tournament: ${tournamentData.id}
Playing game ${currentGameNumber} of ${totalGames}

name\t\t\t\t\t\tpoints\tgames\twon\tlost\tdrew\tpieceBalance\tspeed\tmovePoints
${Object.keys(tournamentData.playerStats)
  .sort(
    (a, b) =>
      (tournamentData.playerStats[b].points * 100000 +
        tournamentData.playerStats[b].pieceBalance * 100 +
        tournamentData.playerStats[b].movePoints) /
        (tournamentData.playerStats[b].games + 0.01) -
      (tournamentData.playerStats[a].points * 100000 +
        tournamentData.playerStats[a].pieceBalance * 100 +
        tournamentData.playerStats[a].movePoints) /
        (tournamentData.playerStats[a].games + 0.01),
  )
  .map(
    (name) =>
      `${`${name}${' '.repeat(45)}`.substring(0, 45)}\t${tournamentData.playerStats[name].points}\t${
        tournamentData.playerStats[name].games
      }\t${tournamentData.playerStats[name].won}\t${tournamentData.playerStats[name].lost}\t${
        tournamentData.playerStats[name].drew
      }\t${tournamentData.playerStats[name].pieceBalance}\t\t${average(
        tournamentData.playerStats[name].thinkingTimes,
      ).toFixed(2)}\t${tournamentData.playerStats[name].movePoints}`,
  )
  .join('\n')}
  `;

  // p[c] = { points: 0, pieceBalance: 0, movePoints: 0, games: 0 };

  const updateCurrentGameInStatsDisplay = ({ game, totalGames: _tg, currentGameNumber: _cgn }) => {
    Object.assign(currentGame, game);
    totalGames = _tg;
    currentGameNumber = _cgn;
    displayedStatsUpdater(getFormattedStats());
  };

  const updateTournamentDataHandler = (_tournamentData, comms) => {
    Object.assign(tournamentData, _tournamentData);

    displayedStatsUpdater(getFormattedStats());
    comms.send('OK');
  };

  return {
    updateTournamentDataHandler,
    updateCurrentGameInStatsDisplay,
  };
};
export const startTournament = async ({
  randomValue,
  rounds,
  displayedGameUpdater = () => {},
  displayedStatsUpdater = () => {},
  fenSetName,
}) => {
  const tournamentSocket = await getTournamentSocket();

  // console.log({ rounds, randomValue });

  const { updateTournamentDataHandler, updateCurrentGameInStatsDisplay } = getTournamentDataUpdater({
    displayedStatsUpdater,
  });
  tournamentSocket.on('updateTournamentData', updateTournamentDataHandler);

  const updateTournamentStats = async (game) => tournamentSocket.do('tournamentGameFinished', game);

  const { games } = await tournamentSocket.do('startTournament', { fenSetName });
  const totalGames = games.length;
  // console.log({ games });
  while (games.length) {
    const game = games.pop();

    tf.engine().startScope();

    await autoPlayTournamentGame({
      game,
      rounds,
      randomValue,
      displayedStatsUpdater,
      displayedGameUpdater,
      updateCurrentGameInStatsDisplay: (game) =>
        updateCurrentGameInStatsDisplay({ game, totalGames, currentGameNumber: totalGames - games.length }),
      updateTournamentStats,
      totalGames,
      currentGame: totalGames - games.length + 1,
    });

    tf.engine().endScope();

    // await new Promise((r) => setTimeout(r, 200));
    // if (games.length % 10 === 0) await new Promise((r) => setTimeout(r, 3000));
  }
};
