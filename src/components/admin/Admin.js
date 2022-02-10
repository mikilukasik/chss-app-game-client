import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from './style.css';
import UserContext from '../../context/UserContext';
import { persistUserSettings } from '../../services/userService';
import { GameBuilder } from '../game/gameBuilder';
import { LearningControl } from '../learningControl/LearningControl';
import { SideBar } from './sideBar';
import { AdminTab } from './adminTab/AdminTab';
import { EngineTournament } from './engineTournament/EngineTournament';
import { OldAdmin } from '.';

const subRouteCompinents = {
  'engine-tournament': <EngineTournament />,
  'old-admin': <OldAdmin />,
};

export const Admin = ({ subRoute }) => {
  console.log(subRoute);
  return (
    <div className={style.gameContainer}>
      <SideBar />
      {/* <AdminTab /> */}
      {subRouteCompinents[subRoute]}
    </div>
  );
};
