import { h } from 'preact';
import style from '../board/style.scss';

import { MovePager } from '../movePager';
import { fen2intArray } from '../../../../chss-module-engine/src/engine_new/transformers/fen2intArray';
import { toNested } from '../../../utils/toNested';

export const ReplayBoard = ({ replayMoveNumber, setReplayMoveNumber, gameState }) => {
  const fen = gameState.allPastFens[replayMoveNumber];
  const board = fen2intArray(fen);
  const nestedBoard = toNested(board);

  return (<div>
    <div className={style.boardContainer}>
      <div className={style.boardRow}>
        <div className={style.boardHeadingCell}> </div>
        {'ABCDEFGH'.split('').map((letter, i) => <div key={i} className={style.boardHeadingCell}>{letter}</div>)}
      </div>
      {nestedBoard.map((row, rowIndex) => (<div key={rowIndex} className={style.boardRow}>
        <div className={style.boardHeadingCellWrapper}><div className={style.boardHeadingCell}>{8 - rowIndex}</div></div>
        {row.map((cell, colIndex) => (
          <div key={colIndex} className={(rowIndex + colIndex) & 1  ? style.darker : style.square}>
            <div>
              <img src={`/assets/pieces/${cell}.png`} />
            </div>
          </div>)
        )}
      </div>))}
      <MovePager {...{ replayMoveNumber, setReplayMoveNumber, gameState }} />
    </div>
  </div>);
};
