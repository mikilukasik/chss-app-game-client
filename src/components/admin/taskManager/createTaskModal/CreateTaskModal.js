import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import Dialog from 'preact-material-components/Dialog';
import Select from 'preact-material-components/Select';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';

import style from './style.css';
import { getAvailableCommands, createTask, getTaskDefinition } from '../../../../services/taskService';
import { TaskArgs } from './taskArgs';

const isNewTaskComplete = ({ newTask, taskDefinition }) => {
  if (!taskDefinition) return false;
  return (
    Object.keys(taskDefinition.argShape || {}).filter(
      (key) => taskDefinition.argShape[key].required && [null, undefined].includes(newTask[key]),
    ).length === 0
  );
};

export const CreateTaskModal = ({ useRef }) => {
  const [chosenIndex, setChosenIndex] = useState(null);
  const [availableCommands, setAvailableCommands] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [taskDefinition, setTaskDefinition] = useState();

  const command = availableCommands[chosenIndex - 1];

  useEffect(async () => {
    if (typeof command === 'undefined') return;
    const td = await getTaskDefinition({ command });
    setTaskDefinition(td);

    const newTaskWithDefaults = { ...newTask };
    for (const key of Object.keys(td.argShape || {})) {
      const defaultValue = (td.argShape[key].defaultValue || '').toString();

      if (typeof defaultValue === 'undefined' || newTask[key] === defaultValue) continue;
      newTaskWithDefaults[key] = defaultValue;
    }

    setNewTask(newTaskWithDefaults);
  }, [chosenIndex]);

  const newTaskComplete = isNewTaskComplete({ newTask, taskDefinition });

  useEffect(async () => {
    setAvailableCommands(await getAvailableCommands());
  }, []);

  const onAccept = () => {
    createTask(newTask);
  };

  return (
    <Dialog ref={useRef} onAccept={onAccept}>
      <Dialog.Header>Create New Task</Dialog.Header>

      <Dialog.Body scrollable={false}>
        <div class={style.commandSelector}>
          <Select
            hintText="Select a command"
            selectedIndex={chosenIndex}
            onChange={(e) => {
              setChosenIndex(e.target.selectedIndex);
              setNewTask({ command: availableCommands[e.target.selectedIndex - 1] });
            }}
          >
            {availableCommands.map((command) => (
              <Select.Item key={command}>{command}</Select.Item>
            ))}
          </Select>
        </div>
        {chosenIndex !== null && (
          <TaskArgs command={availableCommands[chosenIndex - 1]} {...{ newTask, setNewTask, taskDefinition }} />
        )}
      </Dialog.Body>

      <Dialog.Footer>
        <Dialog.FooterButton cancel={true}>Cancel</Dialog.FooterButton>
        <Dialog.FooterButton accept={true} disabled={!newTaskComplete}>
          Add
        </Dialog.FooterButton>
      </Dialog.Footer>
    </Dialog>
  );
};
