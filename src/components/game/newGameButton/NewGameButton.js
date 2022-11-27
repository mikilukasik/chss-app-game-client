import { h } from 'preact';
import style from './style.scss';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import UserContext from '../../../context/UserContext';
import { getPlayerSocket, setCurrentGameId } from '../../../services/gamesService';
import { showLoginModal } from '../../loginModal';
import { askNewGameSettings } from '../newGameSettings/NewGameSettings';

export const NewGameButton = () => {
  const { user } = useContext(UserContext);

  const newGameClickHandler = async () => {
    if (!user) {
      showLoginModal();
      return;
    }

    const newGameSettings = await askNewGameSettings();

    const playerSocket = await getPlayerSocket();
    playerSocket
      .do('newGame', {
        user,
        ...newGameSettings,
      })
      .then(({ gameId }) => {
        setCurrentGameId(gameId);
      })
      .catch(console.error);
  };

  return <button onClick={newGameClickHandler}>New Game</button>;
};
