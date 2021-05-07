import { h } from 'preact';
import style from './sideBar.scss';
import { useContext } from 'preact/hooks';
import { NewGameButton } from '../newGameButton';
import GameContext from '../../../context/GameContext';
import { SmallBoard } from './smallBoard';

export const SideBar = () => {
	const { activeGames } = useContext(GameContext);

return (<div className={style.sideBarContainer}>
    <NewGameButton />
    {activeGames && activeGames.map(game => <SmallBoard game={game} />)}
  </div>);
};
