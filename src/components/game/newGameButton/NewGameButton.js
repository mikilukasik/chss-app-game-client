import { h } from 'preact';
import style from './style.scss';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { playerSocket } from '../../..';
import UserContext from '../../../context/UserContext';
import { setCurrentGameId } from '../../../services/gamesService';
import { showLoginModal } from '../../loginModal';

export const NewGameButton = () => {
	const { user } = useContext(UserContext);

  const newGameClickHandler = () => {
    if (!user) {
      showLoginModal();
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
