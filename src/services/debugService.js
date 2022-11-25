import { h } from 'preact';
import { getLegalMoveCountThrowMethod } from '../../../chss-module-engine/src/engine_new/testUtils/getLegalMoveCountThrowMethod';
import { board2fen } from '../../../chss-module-engine/src/engine_new/transformers/board2fen';
import { move2moveString } from '../../../chss-module-engine/src/engine_new/transformers/move2moveString';
import { moveString2move } from '../../../chss-module-engine/src/engine_new/transformers/moveString2move';
import { getMovedBoard } from '../../../chss-module-engine/src/engine_new/utils/getMovedBoard';
import { GameModel } from '../../../chss-module-engine/src/model/Game';
import { fen2intArray } from '../../../chss-service-game-handler/chss-module-engine/src/engine_new/transformers/fen2intArray';
import { generateLegalMoves } from '../../chss-module-engine/src/engine_new/moveGenerators/generateLegalMoves';
import { perfTestFens } from './debugHelpers/perftTestFens';
import { getCurrentGameState, getCurrentGameUpdater, getPlayerSocket, startCustomGame } from './gamesService';
import { getUser } from './userService';

export const perft = (depth = 5, fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') => {
  const chssEncodedMoves = generateLegalMoves(fen2intArray(fen));

  if (depth === 1) return chssEncodedMoves.length;

  const chssNextFens = Array.from(chssEncodedMoves)
    .map((encodedMove) => getMovedBoard(encodedMove, fen2intArray(fen)))
    .map(board2fen);

  return chssNextFens.map((nextFen) => perft(depth - 1, nextFen)).reduce((p, c) => p + c, 0);
};

export const perftTest = () => {
  const stats = {
    matchCount: 0,
    errorCount: 0,
    errored: [],
  };

  perfTestFens.forEach(({ fen, depth, result, description }) => {
    const moveCount = perft(depth, fen);
    if (moveCount === result) {
      console.log(`Match: ${moveCount} ${description} ${fen} d${depth}`);
      stats.matchCount += 1;
      return;
    }

    console.log(`ERROR: ${moveCount} (exp: ${result}) ${description} ${fen} d${depth}`);
    stats.errorCount += 1;
    stats.errored.push({ fen, depth, description });
  });

  return stats;
};

export const debugService = async () => {
  if (typeof window === 'undefined') return;

  // const playerSocket = await getPlayerSocket();
  const currentGameUpdater = await getCurrentGameUpdater();

  // window.getLegalMoveCountThrowMethod = getLegalMoveCountThrowMethod;

  // const perft = (depth = 5, fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') => {
  //   const board = fen2intArray(fen);
  //   const moves = generateLegalMoves(board);
  //   playerSocket
  //     .do('perft', { board: Array.from(board), moves: Array.from(moves), depth }, ({ onData }) => {
  //       onData(({ progress: { total, completed } }) => console.log(`${completed} / ${total}`));
  //     })
  //     .then(console.log, console.error);
  // };

  const displayBoard = async (board) => {
    const user = await getUser();
    const userId = user?.userId ?? null;
    currentGameUpdater(new GameModel({ board, wPlayer: userId, bPlayer: userId }));
  };

  const getFen = () => {
    const gameState = getCurrentGameState();
    return board2fen(gameState.board);
  };

  const displayFen = (fen) => {
    displayBoard(fen2intArray(fen));
  };

  window.CHSS = Object.assign(window.CHSS || {}, {
    perft,
    perftTest,
    displayBoard,
    getFen,
    displayFen,
    startCustomGame,
    board2fen,
    fen2intArray,
    move2moveString,
    moveString2move,
  });
};
