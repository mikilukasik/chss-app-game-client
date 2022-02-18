import { h } from 'preact';
import { TaskArg } from '../taskArg';

import style from './style.css';

export const TaskArgs = ({ newTask, setNewTask, taskDefinition }) => {
  if (!taskDefinition) return null;

  return (
    <div>
      {Object.keys(taskDefinition.argShape || {}).map((key) => (
        <div class={style.taskArgContainer} key={key}>
          <TaskArg {...taskDefinition.argShape[key]} {...{ argKey: key, newTask, setNewTask }} />
        </div>
      ))}
    </div>
  );
};
