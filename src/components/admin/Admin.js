import { h } from 'preact';
import style from './style.css';
import { SideBar } from './sideBar';
import { OldAdmin } from '.';
import { EngineTournament } from './engineTournament';
import { TaskManager } from './taskManager';

const subRouteComponents = {
  'engine-tournament': <EngineTournament />,
  'old-admin': <OldAdmin />,
  'task-manager': <TaskManager />,
};

export const Admin = ({ subRoute }) => (
  <div className={style.gameContainer}>
    <SideBar />
    {subRouteComponents[subRoute]}
  </div>
);
