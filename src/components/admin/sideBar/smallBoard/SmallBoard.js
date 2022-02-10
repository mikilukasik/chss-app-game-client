import { h } from 'preact';
import style from './style.scss';

import { setCurrentGameId } from '../../../../services/gamesService';
import { toNested } from '../../../../utils/toNested';

export const SmallBoard = ({ game }) => {
  const label = `${game.wName} vs ${game.bName}`;
  const nestedBoard = toNested(game.board);

  const clickHandler = () => {
    setCurrentGameId(game.id);
  };

  return (<div onclick={clickHandler}>
    <div className={style.boardContainer}>
      {nestedBoard.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
        {row.map((cell, colIndex) => (<div key={colIndex} className={(rowIndex + colIndex) & 1  ? style.darker : style.square}>
          <div>
            <img src={`/assets/pieces/${cell}.png`} />
          </div>
        </div>))}
      </div>))}
      <div className={style.boardLabel}>{label}</div>
    </div>
  </div>);
};
