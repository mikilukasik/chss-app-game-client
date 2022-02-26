import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getTaskSocket } from '../../../../services/taskService';

import style from './style.scss';
import { TaskCard } from './taskCard';

let _taskList = [];

export const TaskList = ({ taskPath, setTaskPath }) => {
  const [taskList, setTaskList] = useState([]);
  const [currentSubscriptionKey, setCurrentSubscriptionKey] = useState(null);
  // const [taskChangeSubscriptions, setTaskChangeSubscriptions] = useState([]);

  const changeTask = async (task) => {
    // if (task.parentId) return;

    const taskIndex = _taskList.findIndex(({ _id }) => _id === task._id);

    if (taskIndex < 0) return;

    const newTaskList = _taskList.slice();
    newTaskList[taskIndex] = task;
    _taskList = newTaskList;

    setTaskList(newTaskList);
  };

  useEffect(async () => {
    const parentId = taskPath[taskPath.length - 1];

    const taskSocket = await getTaskSocket();
    _taskList = await taskSocket.do('getTaskList', parentId ? { filters: { parentId } } : {});
    setTaskList(_taskList); //.filter((task) => !task.parentId));

    if (currentSubscriptionKey) taskSocket.unsubscribe(currentSubscriptionKey);

    const subscriptionName = parentId ? `childTaskListChangedFor${parentId}` : 'taskListChanged';
    taskSocket.subscribe(subscriptionName, async () => {
      setCurrentSubscriptionKey(subscriptionName);
      _taskList = await taskSocket.do('getTaskList', parentId ? { filters: { parentId } } : {});
      setTaskList(_taskList); //.filter((task) => !task.parentId));
    });
  }, [taskPath]);

  useEffect(async () => {
    const taskSocket = await getTaskSocket();
    taskSocket.subscribe('taskChanged', changeTask);
  }, []);

  return (
    <div className={style.taskListContainer}>
      {taskList.map((task) => (
        <TaskCard {...{ taskPath, setTaskPath, task }} />
      ))}
    </div>
  );
};
