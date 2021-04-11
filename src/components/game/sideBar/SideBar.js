import { h } from 'preact';
import style from './style.scss';

import { useContext, useState } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInTable, singleThreadAi } from '../../../engine/engine';
import { NewGameButton } from '../newGameButton';

export const SideBar = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { table } = gameState;
  const [firstClickedCellAddress, setFirstClickedCellAddress] = useState();

  return (<div className={style.sideBarContainer}>
    <NewGameButton />
  </div>);
};
