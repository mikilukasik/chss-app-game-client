import { generateLegalMoves } from "../../../chss-module-engine/src/engine_new/moveGenerators/generateLegalMoves";
import { generatePseudoMoves } from "../../../chss-module-engine/src/engine_new/moveGenerators/generatePseudoMoves";
import { isCaptured } from "../../../chss-module-engine/src/engine_new/utils/isCaptured";
import { toFen } from "../../chss-module-engine/src/engine/engine";
import { fen2intArray } from "../../chss-module-engine/src/engine_new/transformers/fen2intArray";
import { getLegalMoveCount } from "../../chss-module-engine/src/engine_new/testUtils/getLegalMoveCount";
import { getMovedBoard } from "../../chss-module-engine/src/engine_new/utils/getMovedBoard";
import { getLegalMoveCountThrowMethod } from "../../chss-module-engine/src/engine_new/testUtils/getLegalMoveCountThrowMethod";


const gamesCache = {};
const gameLoadedAwaiters = {};

let currentGameId;

let _gamesSetter;
const gamesSetterAwaiters = [];

let _playerSocket;
const playerSocketAwaiters = [];

let _currentGameUpdater;
const currentGameUpdaterAwaiters = [];

let _replayMoveNumberSetter;
const replayMoveNumberSetterAwaiters = [];

const getSortedGames = () => Object.keys(gamesCache)
  .map(key => gamesCache[key])
  .sort((gameA, gameB) => new Date(gameB.createdAt).getTime() - new Date(gameA.createdAt).getTime())

const getGamesSetter = () => new Promise(resolve => {
	if (_gamesSetter) return resolve(_gamesSetter);
	gamesSetterAwaiters.push(resolve);
});

export const setGames = async(games) => {
	const gamesSetter = await getGamesSetter();
	gamesSetter(games);
};

export const useGamesSetter = (gamesSetter) => {
  _gamesSetter = gamesSetter;
  gamesSetterAwaiters.forEach(resolve => resolve(gamesSetter));		
};

export const getPlayerSocket = () => new Promise(resolve => {
  if (_playerSocket) return resolve(_playerSocket);
  playerSocketAwaiters.push(resolve);
});

export const usePlayerSocket = (playerSocket) => {
  _playerSocket = playerSocket;
  playerSocketAwaiters.forEach(resolve => resolve(playerSocket));
};

export const getCurrentGameUpdater = () => new Promise(resolve => {
  if (_currentGameUpdater) return resolve(_currentGameUpdater);
  currentGameUpdaterAwaiters.push(resolve);
});

export const useCurrentGameUpdater = (currentGameUpdater) => {
  _currentGameUpdater = currentGameUpdater;
  currentGameUpdaterAwaiters.forEach(resolve => resolve(currentGameUpdater));
};

export const useReplayMoveNumberSetter = (replayMoveNumberSetter) => {
  _replayMoveNumberSetter = replayMoveNumberSetter;
  replayMoveNumberSetterAwaiters.forEach(resolve => resolve(replayMoveNumberSetter));
};

const getReplayMoveNumberSetter = async() => new Promise(resolve => {
  if (_replayMoveNumberSetter) return resolve(_replayMoveNumberSetter);
  replayMoveNumberSetterAwaiters.push(resolve);
});


const waitForGameToLoad = async(id) => new Promise(async(resolve) => {
  if (gamesCache[id]) return resolve(gamesCache[id]);

  // TODO: rework the below when adding game filters. getGames should get gameIds from mongo only, then subscribe to all of them 
  const playerSocket = await getPlayerSocket();
  gamesCache[id] = await playerSocket.do('getGame', { id });
  resolve(gamesCache[id]);
});

export const setCurrentGameId = async(id) => {
  if (id === currentGameId || !id) return;
  const replayMoveNumberSetter = await getReplayMoveNumberSetter();
  replayMoveNumberSetter(-1);

  const playerSocket = await getPlayerSocket();

  if (currentGameId && gamesCache) playerSocket.unsubscribe(`gameCompleted:${currentGameId}`);
  currentGameId = id;
  
  const currentGame = gamesCache[id] || await waitForGameToLoad(id);
  
  if (currentGame.status === 'active') playerSocket.subscribe(`gameCompleted:${id}`, async({ whiteWon, blackWon, isDraw }) => {
    playerSocket.unsubscribe(`gameCompleted:${id}`);

    await new Promise(r => setTimeout(r, 250));
    if (blackWon) alert(`Black won.`);
    if (whiteWon) alert(`White won.`);
    if (isDraw) alert(`Game finished in a draw.`);
  });

  const currentGameUpdater = await getCurrentGameUpdater();
  currentGameUpdater(currentGame);
};

(async() => {
  const playerSocket = await getPlayerSocket();
  const games = await playerSocket.do('getGames')
  games.forEach(game => gamesCache[game.id] = game);

  playerSocket.subscribe('activeGamePaused', (game) => {
    if (true /* // TODO: if we don't list paused games */) delete gamesCache[game.id];
    playerSocket.unsubscribe(`gameChanged:${game.id}`);
    setGames(getSortedGames());
  });

  const newActiveHandler = (game) => {
    gamesCache[game.id] = game;
    playerSocket.subscribe(`gameChanged:${game.id}`, async(newGameState) => {

      testLog(newGameState)


      gamesCache[game.id] = newGameState;
      if (gameLoadedAwaiters[game.id]) gameLoadedAwaiters[game.id].forEach(resolve => resolve(newGameState));
      if (currentGameId === game.id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      setGames(getSortedGames());
    });
    setGames(getSortedGames());
  };

  playerSocket.subscribe('gameCreated', newActiveHandler);
  playerSocket.subscribe('gameBecameActive', newActiveHandler);

  const gamesSetter = await getGamesSetter();
  gamesSetter(getSortedGames());
  Object.keys(gamesCache).forEach(async(id) => {
    const game = gamesCache[id];
    if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach(resolve => resolve(game));
    if (currentGameId === id) {
      const currentGameUpdater = await getCurrentGameUpdater();
      currentGameUpdater(game);
    }

    const playerSocket = await getPlayerSocket();
    playerSocket.subscribe(`gameChanged:${id}`, async(newGameState) => {

      testLog(newGameState);

      gamesCache[id] = newGameState;
      if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach(resolve => resolve(newGameState));
      if (currentGameId === id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      setGames(getSortedGames());
    });
  })
})();

const moveTransformer = moves => Array.from(moves).map(x => `${x >> 6} -> ${x & 63}`).join(', ');

window.test = {
  moveTransformer,
  generateLegalMoves,
  getLegalMoveCount,
  getLegalMoveCountThrowMethod,
  fen2intArray,
  getMovedBoard,
  glmctm: (depth, fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -') => {
    const started = Date.now();
    console.log(getLegalMoveCountThrowMethod(fen2intArray(fen), depth));
    console.log(`${Date.now() - started}ms`);
  },
  glmc: (depth, fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -') => {
    const started = Date.now();
    console.log(getLegalMoveCount(fen2intArray(fen), depth));
    console.log(`${Date.now() - started}ms`);
  },
  testDepth: (fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -', d = 4) => {
    const started = Date.now();
    for (let depth = 1; depth < d + 1; depth += 1) {
      const depthStarted = Date.now();
      console.log(getLegalMoveCountThrowMethod(fen2intArray(fen), depth).toString().padEnd(15), `${Date.now() - depthStarted}ms`);
    }
    console.log(`total: ${Date.now() - started}ms`);
  },
  perft: (fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -') => {
    const started = Date.now();
    for (let depth = 1; depth < 5; depth += 1) {
      const depthStarted = Date.now();
      console.log(getLegalMoveCount(fen2intArray(fen), depth).toString().padEnd(15), `${Date.now() - depthStarted}ms`);
    }
    console.log(`total: ${Date.now() - started}ms`);
  },
};

const testLog = (game) => {
  const fen = toFen(game);
  const board = fen2intArray(fen);
  const pseudoMoves = generatePseudoMoves(board);
  
  const legalMoves = generateLegalMoves(board);
  const captured = isCaptured(board, board.indexOf((board[64] << 3) + 6), board[64]);

  console.log({
    // fen,
    board,
    // p: moveTransformer(pseudoMoves),
    // l: moveTransformer(legalMoves),
    pl: pseudoMoves.length,
    ll: legalMoves.length,
    // captured
  })
};
