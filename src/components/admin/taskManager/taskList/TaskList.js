import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getTaskSocket } from '../../../../services/taskService';

import style from './style.scss';
import { TaskCard } from './taskCard';

let _taskList = [];

export const TaskList = () => {
  const [taskList, setTaskList] = useState([]);

  const changeTask = async (task) => {
    if (task.parentId) return;

    const newTaskList = _taskList.slice();
    const taskIndex = newTaskList.findIndex(({ _id }) => _id === task._id);

    if (taskIndex < 0) return;
    newTaskList[taskIndex] = task;

    _taskList = newTaskList;
    setTaskList(newTaskList.filter((task) => !task.parentId));
  };

  useEffect(async () => {
    const taskSocket = await getTaskSocket();
    _taskList = await taskSocket.do('getTaskList');
    setTaskList(_taskList.filter((task) => !task.parentId));

    taskSocket.subscribe('taskListChanged', async () => {
      _taskList = await taskSocket.do('getTaskList');
      setTaskList(_taskList.filter((task) => !task.parentId));
    });

    taskSocket.subscribe('taskChanged', changeTask);
  }, []);

  return <div className={style.taskListContainer}>{taskList.map(TaskCard)}</div>;
};
