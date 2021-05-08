import { h } from 'preact';
import style from './sideBar.scss';
import { useContext } from 'preact/hooks';
import { NewGameButton } from '../newGameButton';
import GameContext from '../../../context/GameContext';
import { SmallBoard } from './smallBoard';

export const SideBar = () => {
	const { games } = useContext(GameContext);

return (<div className={style.sideBarContainer}>
    <div className={style.sideBarItem}>
      <NewGameButton />
    </div>
    {games && games.map(game => <div className={style.sideBarItem}><SmallBoard game={game} /></div>)}
  </div>);
};
