import { h } from 'preact';
import style from './style.scss';

import { rotateTable, aptStringToTable } from '../../../../chss-module-engine/src/engine/engine';
import { MovePager } from '../movePager';

export const ReplayBoard = ({ replayMoveNumber, setReplayMoveNumber, gameState }) => {
  const stateAsString = gameState.allPastTables[replayMoveNumber];
  const table = aptStringToTable(stateAsString);
  const whiteState = rotateTable(table);

  return (<div>
    <div className={style.boardContainer}>
      <div className={style.boardRow}>
        <div className={style.boardHeadingCell}> </div>
        {'ABCDEFGH'.split('').map((letter, i) => <div key={i} className={style.boardHeadingCell}>{letter}</div>)}
      </div>
      {whiteState.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
        <div className={style.boardHeadingCellWrapper}><div className={style.boardHeadingCell}>{8 - rowIndex}</div></div>
        {row.map((cell, colIndex) => (<div key={colIndex} className={(rowIndex + colIndex) & 1  ? style.darker : style.square}>
          <div>
            <img src={`/assets/pieces/${cell[0]}${cell[1]}.png`} className={`${cell[8] || cell[9] ? style.selected : ''} ${cell[15] ? style.selected2 : ''}`} />
          </div>
        </div>))}
      </div>))}
      <MovePager {...{ replayMoveNumber, setReplayMoveNumber, gameState }} />
    </div>
  </div>);
};
