import { h } from 'preact';
import Button from 'preact-material-components/Button';
import { CreateTaskModal } from './createTaskModal/CreateTaskModal';
import style from './style.scss';
import { TaskList } from './taskList';
import { useState } from 'preact/hooks';
import { BreadCrumb } from './breadCrumb';

let createTaskModalDialog;

export const TaskManager = () => {
  const [taskPath, setTaskPath] = useState([]);

  const createTaskClickHandler = () => {
    createTaskModalDialog?.MDComponent?.show();
  };

  const useCreateTaskModalRef = (dialog) => {
    createTaskModalDialog = dialog;
  };

  return (
    <div className={style.taskManagerContainer}>
      <CreateTaskModal useRef={useCreateTaskModalRef} />
      <div className={style.headerContainer}>
        <div className={style.breadCrumbContainer}>
          <BreadCrumb {...{ taskPath, setTaskPath }} />
        </div>

        <div className={style.buttonsContainer}>
          <Button className={style.newTaskButton} onClick={createTaskClickHandler}>
            Create Task
          </Button>
        </div>
      </div>
      <TaskList {...{ taskPath, setTaskPath }} />
    </div>
  );
};
