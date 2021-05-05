import { h } from 'preact';
import style from './sideBar.scss';
import { useContext } from 'preact/hooks';
import { NewGameButton } from '../newGameButton';
import GameContext from '../../../context/GameContext';

export const SideBar = () => {
	const { activeGameIds } = useContext(GameContext);

  return (<div className={style.sideBarContainer}>
    <NewGameButton />
    {activeGameIds}
  </div>);
};
