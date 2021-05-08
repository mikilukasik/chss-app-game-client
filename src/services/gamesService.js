const activeGamesCache = [];
const gameLoadedAwaiters = {};

let currentGameId;

let _activeGamesSetter;
const activeGamesSetterAwaiters = [];

let _playerSocket;
const playerSocketAwaiters = [];

let _currentGameUpdater;
const currentGameUpdaterAwaiters = [];

const getActiveGamesSetter = () => new Promise(resolve => {
	if (_activeGamesSetter) return resolve(_activeGamesSetter);
	activeGamesSetterAwaiters.push(resolve);
});

export const setActiveGames = async(activeGames) => {
	const activeGamesSetter = await getActiveGamesSetter();
	activeGamesSetter(activeGames);
};

export const useActiveGamesSetter = (activeGamesSetter) => {
  _activeGamesSetter = activeGamesSetter;
  activeGamesSetterAwaiters.forEach(resolve => resolve(activeGamesSetter));		
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
  if (activeGamesCache[id]) return resolve(activeGamesCache[id]);
  gameLoadedAwaiters[id] = (gameLoadedAwaiters[id] || []).push(resolve);
});

export const setCurrentGameId = async(id) => {
  currentGameId = id;
  const currentGameUpdater = await getCurrentGameUpdater();
  const currentGame = activeGamesCache.find(game => game.id === id) || waitForGameToLoad(id);
  currentGameUpdater(currentGame);
};

(async() => {
  const playerSocket = await getPlayerSocket();
  const activeGames = await playerSocket.do('getActiveGames')
  activeGamesCache.push(...activeGames);

  playerSocket.subscribe('activeGamePaused', (game) => {
    activeGamesCache.splice(activeGamesCache.findIndex(({ id }) => id === game.id), 1);
    playerSocket.unsubscribe(`gameChanged:${game.id}`);
    setActiveGames(activeGamesCache.slice());
  });

  playerSocket.subscribe('gameCreated', (game) => {
    activeGamesCache.unshift(game);
    playerSocket.subscribe(`gameChanged:${game.id}`, async(newGameState) => {
      const activeGamesCacheIndex = activeGamesCache.findIndex(({ id }) => game.id === id)

      activeGamesCache[activeGamesCacheIndex] = newGameState;
      if (gameLoadedAwaiters[game.id]) gameLoadedAwaiters[game.id].forEach(resolve => resolve(newGameState));
      if (currentGameId === game.id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      
      setActiveGames(activeGamesCache.slice());
    });
    setActiveGames(activeGamesCache.slice());
  });

  const activeGamesSetter = await getActiveGamesSetter();
  activeGamesSetter(activeGamesCache);
  activeGamesCache.forEach(async(game) => {
    const { id } = game;
    if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach(resolve => resolve(game));
    if (currentGameId === id) {
      const currentGameUpdater = await getCurrentGameUpdater();
      currentGameUpdater(game);
    }

    const playerSocket = await getPlayerSocket();
    playerSocket.subscribe(`gameChanged:${id}`, async(newGameState) => {
      console.log('received game changed 2')

      const activeGamesCacheIndex = activeGamesCache.findIndex(game => game.id === id)
      activeGamesCache[activeGamesCacheIndex] = newGameState;
      if (gameLoadedAwaiters[id]) gameLoadedAwaiters[id].forEach(resolve => resolve(newGameState));
      if (currentGameId === id) {
        const currentGameUpdater = await getCurrentGameUpdater();
        currentGameUpdater(newGameState);
      }
      setActiveGames(activeGamesCache.slice());
    });
  })
})();
