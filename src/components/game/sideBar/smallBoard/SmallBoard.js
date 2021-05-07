import { h } from 'preact';
import style from './style.scss';

import { useContext } from 'preact/hooks';
import { rotateTable } from '../../../../../chss-module-engine/src/engine/engine';
import GameContext from '../../../../context/GameContext';
import { setCurrentGameId } from '../../../../services/gamesService';

export const SmallBoard = ({ game }) => {
  const label = `${game.wName} vs ${game.bName}`;
  const whiteState = rotateTable(game.table);

  const clickHandler = () => {
    setCurrentGameId(game.id);
  };

  return (<div onclick={clickHandler}>
    <div className={style.boardContainer}>
      {whiteState.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
        {row.map((cell, colIndex) => (<div key={colIndex} className={(rowIndex + colIndex) & 1  ? style.darker : style.square}>
          <div>
            <img src={`/assets/pieces/${cell[0]}${cell[1]}.png`} />
          </div>
        </div>))}
      </div>))}
      <div className={style.boardLabel}>{label}</div>
    </div>
  </div>);
};
