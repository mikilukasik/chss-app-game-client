import { h } from 'preact';
import style from './style.scss';
import { playerSocket } from '../../..';

export const NewGameButton = () => {
  const newGameClickHandler = () => {
		playerSocket.do('newGame').catch(console.error);
  };

  return (<button onClick={newGameClickHandler}>
    New Game
  </button>);
};
