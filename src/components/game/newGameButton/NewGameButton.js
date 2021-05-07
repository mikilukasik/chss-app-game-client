import { h } from 'preact';
import style from './style.scss';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { playerSocket } from '../../..';
import UserContext from '../../../context/UserContext';
import { setCurrentGameId } from '../../../services/gamesService';

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
      setCurrentGameId(gameId);
    }).catch(console.error);
  };

  return (<button onClick={newGameClickHandler} >
    New Game
  </button>);
};
