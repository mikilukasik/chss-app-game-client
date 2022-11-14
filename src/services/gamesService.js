import { getUser } from './userService';

const gamesCache = {};
const gameLoadedAwaiters = {};

let currentGameId;

let _gamesSetter;
const gamesSetterAwaiters = [];

let _playerSocket;
const playerSocketAwaiters = [];

let _engineSocket;
const engineSocketAwaiters = [];

let _modelStoreSocket;
const modelStoreSocketAwaiters = [];

let _currentGameUpdater;
const currentGameUpdaterAwaiters = [];

let _replayMoveNumberSetter;
const replayMoveNumberSetterAwaiters = [];

let currentGameState;

export const setCurrentGameState = (gameState) => {
  currentGameState = gameState;
};

export const getCurrentGameState = () => currentGameState;

const getSortedGames = () =>
  Object.keys(gamesCache)
    .map((key) => gamesCache[key])
    .sort((gameA, gameB) => new Date(gameB.createdAt).getTime() - new Date(gameA.createdAt).getTime());

const getGamesSetter = () =>
  new Promise((resolve) => {
    if (_gamesSetter) return resolve(_gamesSetter);
    gamesSetterAwaiters.push(resolve);
  });

export const setGames = async (games) => {
  const gamesSetter = await getGamesSetter();
  gamesSetter(games);
};

export const useGamesSetter = (gamesSetter) => {
  _gamesSetter = gamesSetter;
  gamesSetterAwaiters.forEach((resolve) => resolve(gamesSetter));
};

export const getPlayerSocket = () =>
  new Promise((resolve) => {
    if (_playerSocket) return resolve(_playerSocket);
    playerSocketAwaiters.push(resolve);
  });

export const usePlayerSocket = (playerSocket) => {
  _playerSocket = playerSocket;
  playerSocketAwaiters.forEach((resolve) => resolve(playerSocket));
};

export const getEngineSocket = () =>
  new Promise((resolve) => {
    if (_engineSocket) return resolve(_engineSocket);
    engineSocketAwaiters.push(resolve);
  });

export const useEngineSocket = (engineSocket) => {
  _engineSocket = engineSocket;
  engineSocketAwaiters.forEach((resolve) => resolve(engineSocket));
};

export const getModelStoreSocket = () =>
  new Promise((resolve) => {
    if (_modelStoreSocket) return resolve(_modelStoreSocket);
    modelStoreSocketAwaiters.push(resolve);
  });

export const useModelStoreSocket = (modelStoreSocket) => {
  _modelStoreSocket = modelStoreSocket;
  modelStoreSocketAwaiters.forEach((resolve) => resolve(_modelStoreSocket));
};

export const getCurrentGameUpdater = () =>
  new Promise((resolve) => {
    if (_currentGameUpdater) return resolve(_currentGameUpdater);
    currentGameUpdaterAwaiters.push(resolve);
  });

export const useCurrentGameUpdater = (currentGameUpdater) => {
  _currentGameUpdater = currentGameUpdater;
  currentGameUpdaterAwaiters.forEach((resolve) => resolve(currentGameUpdater));
};

export const useReplayMoveNumberSetter = (replayMoveNumberSetter) => {
  _replayMoveNumberSetter = replayMoveNumberSetter;
  replayMoveNumberSetterAwaiters.forEach((resolve) => resolve(replayMoveNumberSetter));
};

const getReplayMoveNumberSetter = async () =>
  new Promise((resolve) => {
    if (_replayMoveNumberSetter) return resolve(_replayMoveNumberSetter);
    replayMoveNumberSetterAwaiters.push(resolve);
  });

const waitForGameToLoad = async (id) =>
  new Promise(async (resolve) => {
    if (gamesCache[id]) return resolve(gamesCache[id]);

    // TODO: rework the below when adding game filters. getGames should get gameIds from mongo only, then subscribe to all of them
    const playerSocket = await getPlayerSocket();
    gamesCache[id] = await playerSocket.do('getGame', { id });
    resolve(gamesCache[id]);
  });

export const setCurrentGameId = async (id) => {
  if (id === currentGameId || !id) return;
  const replayMoveNumberSetter = await getReplayMoveNumberSetter();
  replayMoveNumberSetter(-1);

  const playerSocket = await getPlayerSocket();

  if (currentGameId && gamesCache) playerSocket.unsubscribe(`gameCompleted:${currentGameId}`);
  currentGameId = id;

  const currentGame = gamesCache[id] || (await waitForGameToLoad(id));

  if (currentGame.status === 'active')
    playerSocket.subscribe(`gameCompleted:${id}`, async ({ whiteWon, blackWon, isDraw }) => {
      playerSocket.unsubscribe(`gameCompleted:${id}`);

      await new Promise((r) => setTimeout(r, 250));
      if (blackWon) alert(`Black won.`);
      if (whiteWon) alert(`White won.`);
      if (isDraw) alert(`Game finished in a draw.`);
    });

  const currentGameUpdater = await getCurrentGameUpdater();
  currentGameUpdater(currentGame);
};

(async () => {
  const playerSocket = await getPlayerSocket();
  const games = await playerSocket.do('getGames');
  games.forEach((game) => (gamesCache[game.id] = game));

  playerSocket.subscribe('activeGamePaused', (game) => {
    if (true /* // TODO: if we don't list paused games */) delete gamesCache[game.id];
    playerSocket.unsubscribe(`gameChanged:${game.id}`);
    setGames(getSortedGames());
  });

  const newActiveHandler = (game) => {
    gamesCache[game.id] = game;
    playerSocket.subscribe(`gameChanged:${game.id}`, async (newGameState) => {
      gamesCache[game.id] = newGameState;
      if (gameLoadedAwaiters[game.id]) gameLoadedAwaiters[game.id].forEach((resolve) => resolve(newGameState));
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
  Object.keys(gamesCache).forEach(async (id) => {
    const game = gamesCache[id];
    if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach((resolve) => resolve(game));
    if (currentGameId === id) {
      const currentGameUpdater = await getCurrentGameUpdater();
      currentGameUpdater(game);
    }

    const playerSocket = await getPlayerSocket();
    playerSocket.subscribe(`gameChanged:${id}`, async (newGameState) => {
      gamesCache[id] = newGameState;
      if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach((resolve) => resolve(newGameState));
      if (currentGameId === id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      setGames(getSortedGames());
    });
  });
})();

export const startCustomGame = async (fen) => {
  const playerSocket = await getPlayerSocket();
  const user = getUser();
  const { gameId } = await playerSocket.do('newCustomGame', { fen, user });
  setCurrentGameId(gameId);
};
