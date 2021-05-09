const gamesCache = [];
const gameLoadedAwaiters = {};

let currentGameId;

let _gamesSetter;
const gamesSetterAwaiters = [];

let _playerSocket;
const playerSocketAwaiters = [];

let _currentGameUpdater;
const currentGameUpdaterAwaiters = [];

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

const waitForGameToLoad = async(id) => new Promise(resolve => {
  if (gamesCache[id]) return resolve(gamesCache[id]);
  gameLoadedAwaiters[id] = (gameLoadedAwaiters[id] || []).push(resolve);
});

export const setCurrentGameId = async(id) => {
  if (id === currentGameId || !id) return;
  const playerSocket = await getPlayerSocket();

  if (currentGameId) playerSocket.unsubscribe(`gameCompleted:${currentGameId}`);
  playerSocket.subscribe(`gameCompleted:${id}`, async({ whiteWon, blackWon, isDraw }) => {
    await new Promise(r => setTimeout(r, 250));
    if (blackWon) alert(`Black won.`);
    if (whiteWon) alert(`White won.`);
    if (isDraw) alert(`Game finished in a draw.`);
  });

  currentGameId = id;

  const currentGameUpdater = await getCurrentGameUpdater();
  const currentGame = gamesCache.find(game => game.id === id) || waitForGameToLoad(id);
  currentGameUpdater(currentGame);
};

(async() => {
  const playerSocket = await getPlayerSocket();
  const games = await playerSocket.do('getGames')
  gamesCache.push(...games);

  playerSocket.subscribe('activeGamePaused', (game) => {
    gamesCache.splice(gamesCache.findIndex(({ id }) => id === game.id), 1);
    playerSocket.unsubscribe(`gameChanged:${game.id}`);
    setGames(gamesCache.slice());
  });

  const newActiveHandler = (game) => {
    gamesCache.unshift(game);
    playerSocket.subscribe(`gameChanged:${game.id}`, async(newGameState) => {
      const gamesCacheIndex = gamesCache.findIndex(({ id }) => game.id === id)

      gamesCache[gamesCacheIndex] = newGameState;
      if (gameLoadedAwaiters[game.id]) gameLoadedAwaiters[game.id].forEach(resolve => resolve(newGameState));
      if (currentGameId === game.id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      
      setGames(gamesCache.slice());
    });
    setGames(gamesCache.slice());
  };

  playerSocket.subscribe('gameCreated', newActiveHandler);
  playerSocket.subscribe('gameBecameActive', newActiveHandler);

  const gamesSetter = await getGamesSetter();
  gamesSetter(gamesCache);
  gamesCache.forEach(async(game) => {
    const { id } = game;
    if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach(resolve => resolve(game));
    if (currentGameId === id) {
      const currentGameUpdater = await getCurrentGameUpdater();
      currentGameUpdater(game);
    }

    const playerSocket = await getPlayerSocket();
    playerSocket.subscribe(`gameChanged:${id}`, async(newGameState) => {
      const gamesCacheIndex = gamesCache.findIndex(game => game.id === id)
      gamesCache[gamesCacheIndex] = newGameState;
      if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach(resolve => resolve(newGameState));
      if (currentGameId === id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      setGames(gamesCache.slice());
    });
  })
})();
