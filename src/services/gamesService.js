let _activeGameIdsSetter;
const activeGameIdsSetterAwaiters = [];

let _activeGamesDistobj;
const activeGamesDistobjAwaiters = [];

const getActiveGameIdsSetter = () => new Promise(resolve => {
	if (_activeGameIdsSetter) return resolve(_activeGameIdsSetter);
	activeGameIdsSetterAwaiters.push(resolve);
});

export const setActiveGameIds = async(activeGameIds) => {
	const activeGameIdsSetter = await getActiveGameIdsSetter();
	activeGameIdsSetter(activeGameIds);
};

export const useActiveGameIdsSetter = (activeGameIdsSetter) => {
  _activeGameIdsSetter = activeGameIdsSetter;
  activeGameIdsSetterAwaiters.forEach(resolve => resolve(activeGameIdsSetter));		
};

export const getActiveGamesDistObj = () => new Promise(resolve => {
  if (_activeGamesDistobj) return resolve(_activeGamesDistobj);
  activeGamesDistobjAwaiters.push(resolve);
});

export const useActiveGamesDistobj = (activeGamesDistobj) => {
  _activeGamesDistobj = activeGamesDistobj;
  activeGamesDistobjAwaiters.forEach(resolve => resolve(activeGamesDistobj));
};

(async() => {
  const activeGamesDistObj = await getActiveGamesDistObj();
  activeGamesDistObj.onChange(() => {
    setActiveGameIds(activeGamesDistObj.data.ids.slice());
  });
})();
