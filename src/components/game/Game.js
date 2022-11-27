import { h } from 'preact';
import style from './game.css';
import { Board } from './board';
import { SideBar } from './sideBar';
import { NewGameSettings } from './newGameSettings/NewGameSettings';

export const Game = () => {
  return (
    <div className={style.gameContainer}>
      <SideBar />
      <Board />
      <NewGameSettings />
    </div>
  );
};
