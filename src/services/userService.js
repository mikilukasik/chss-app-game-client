import { getAuthSocket } from '..';

let _user;

let _userSetter;
const userSetterAwaiters = [];

let _userSettingsSetter;
const userSettingsSetterAwaiters = [];


const getUserSetter = () => new Promise(resolve => {
	if (_userSetter) return resolve(_userSetter);
	userSetterAwaiters.push(resolve);
});

const getUserSettingsSetter = () => new Promise(resolve => {
	if (_userSettingsSetter) return resolve(_userSettingsSetter);
	userSettingsSetterAwaiters.push(resolve);
});

export const setUser = async(user) => {
	_user = user;
	const userSetter = await getUserSetter();
	userSetter(user);

	if (user.settings) {
		const userSettingsSetter = await getUserSettingsSetter();
		userSettingsSetter(user.settings);
	}
};

export const useUserSetter = (userSetter) => {
  _userSetter = userSetter;
  userSetterAwaiters.forEach(resolve => resolve(userSetter));		
};

export const getUser = () => _user;

export const useUserSettingsSetter = (userSettingsSetter) => {
  _userSettingsSetter = userSettingsSetter;
  userSettingsSetterAwaiters.forEach(resolve => resolve(userSettingsSetter));		
};

export const persistUserSettings = async(settings) => {
	if (!_user) throw new error('Tried to update user setting, but user is not logged in');
	const authSocket = await getAuthSocket();
	return authSocket.do('persistUserSettings', { userId: _user.userId, settings });
};
