import { h } from 'preact';
import style from './style.scss';

import { useContext, useState } from 'preact/hooks';
import GameContext from '../../../context/GameContext';
import { moveInTable, singleThreadAi } from '../../../engine/engine';

export const NewGameButton = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { table } = gameState;
  const [firstClickedCellAddress, setFirstClickedCellAddress] = useState();

  return (<button>
    New Game
  </button>);
};
