import { h } from 'preact';
import style from './style.scss';
import { gameSocket } from '../../..';

export const NewGameButton = () => {
  const newGameClickHandler = () => {
		gameSocket.do('newGame').then(console.log);
  };

  return (<button onClick={newGameClickHandler}>
    New Game
  </button>);
};
