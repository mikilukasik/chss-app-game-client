let _taskSocket;
const taskSocketAwaiters = [];

export const getTaskSocket = async () =>
  new Promise((resolve) => {
    if (_taskSocket) return resolve(_taskSocket);
    taskSocketAwaiters.push(resolve);
  });

export const useTaskSocket = (taskSocket) => {
  _taskSocket = taskSocket;
  taskSocketAwaiters.forEach((resolve) => resolve(taskSocket));
};

export const createTask = async (task) => {
  const taskSocket = await getTaskSocket();
  taskSocket.do('createTask', task);
};

export const getAvailableCommands = async () => {
  const taskSocket = await getTaskSocket();
  return taskSocket.do('getAvailableCommands');
};

export const getTaskDefinition = async (filters) => {
  const taskSocket = await getTaskSocket();
  return taskSocket.do('getTaskDefinition', filters);
};
