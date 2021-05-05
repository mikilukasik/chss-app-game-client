let _userSetter;
let userSetterAwaiters = [];

const getUserSetter = () => new Promise(resolve => {
	if (_userSetter) return resolve(_userSetter);
	userSetterAwaiters.push(resolve);
});

export const setUser = async(user) => {
	const userSetter = await getUserSetter();
	userSetter(user);
};

export const useUserSetter = (userSetter) => {
  _userSetter = userSetter;
  userSetterAwaiters.forEach(resolve => resolve(userSetter));		
};
