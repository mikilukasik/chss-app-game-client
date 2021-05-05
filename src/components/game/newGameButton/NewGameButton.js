import { h } from 'preact';
import style from './style.scss';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { playerSocket } from '../../..';
import UserContext from '../../../context/UserContext';

export const NewGameButton = () => {
	const { user } = useContext(UserContext);

  const newGameClickHandler = () => {
    if (!user) {
      route('/auth/guest', true); // TODO: pass return url
      return;
    }

		playerSocket.do('newGame', {
      user,
      againstComputer: true,
      userColor: 'white',
    }).then(({ gameId }) => {
      console.log({ gameId });
      // TODO: subscribe to that game and make it active
    }).catch(console.error);
  };

  return (<button onClick={newGameClickHandler} >
    New Game
  </button>);
};
