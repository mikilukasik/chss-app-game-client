import { h } from 'preact';
import style from './sideBar.scss';
import { NewGameButton } from '../newGameButton';

export const SideBar = () => (<div className={style.sideBarContainer}>
  <NewGameButton />
</div>);
