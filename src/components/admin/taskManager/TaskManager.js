import { h } from 'preact';
import Button from 'preact-material-components/Button';
import { CreateTaskModal } from './createTaskModal/CreateTaskModal';
import style from './style.scss';
import { TaskList } from './taskList';

let createTaskModalDialog;

export const TaskManager = () => {
  const createTaskClickHandler = () => {
    createTaskModalDialog?.MDComponent?.show();
  };

  const useCreateTaskModalRef = (dialog) => {
    createTaskModalDialog = dialog;
  };

  return (
    <div className={style.taskManagerContainer}>
      <CreateTaskModal useRef={useCreateTaskModalRef} />
      <div className={style.buttonsContainer}>
        <Button className={style.newTaskButton} onClick={createTaskClickHandler}>
          Create Task
        </Button>
      </div>
      <TaskList />
    </div>
  );
};
