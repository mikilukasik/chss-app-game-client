import { h } from 'preact';
import style from './style.scss';

export const MovePager = ({ replayMoveNumber, setReplayMoveNumber, gameState }) => {
  const getClickHandler = (moveNumebr) => () => setReplayMoveNumber(moveNumebr);

  return (<div className={style.movePagerContainer}>
    <button className={style.movePagerButton} disabled={replayMoveNumber === 0} onClick={getClickHandler(0)} >&lt;&lt;</button>
    <button className={style.movePagerButton} disabled={replayMoveNumber === 0} onClick={getClickHandler(replayMoveNumber === -1 ? gameState.moveCount - 2 : replayMoveNumber - 1)} >&lt;</button>
    <div className={style.replayMoveNumber}>{ replayMoveNumber === -1 ? gameState.moveCount : replayMoveNumber + 1 }</div>
    <button className={style.movePagerButton} disabled={replayMoveNumber === -1} onClick={getClickHandler(replayMoveNumber === gameState.moveCount - 2 ? - 1 : replayMoveNumber + 1)} >&gt;</button>
    <button className={style.movePagerButton} disabled={replayMoveNumber === -1} onClick={getClickHandler(-1)} >&gt;&gt;</button>
  </div>);
};
